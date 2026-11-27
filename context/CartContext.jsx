'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as catalogueProducts } from '../data/products';
import {
  getShopifyProducts,
  mergeShopifyWithLocal,
  createShopifyCart,
  addToShopifyCart,
  updateShopifyCartLines,
  removeFromShopifyCart,
  getShopifyCart,
} from '../lib/shopify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [shopifyCartId, setShopifyCartId] = useState(null);
  const [shopifyCheckoutUrl, setShopifyCheckoutUrl] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [liveProducts, setLiveProducts] = useState(catalogueProducts);
  const [shopifyConnected, setShopifyConnected] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryTitle, setEnquiryTitle] = useState('Enquire About The Collection');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [notification, setNotification] = useState(null);

  const syncLineIdsFromShopifyCart = (shopifyCart) => {
    if (!shopifyCart?.lines?.edges) return;
    const lineByVariant = new Map(
      shopifyCart.lines.edges.map((e) => [e.node.merchandise?.id, e.node.id])
    );
    setCart((prev) =>
      prev.map((item) => {
        const lineId = item.shopifyVariantId ? lineByVariant.get(item.shopifyVariantId) : null;
        return lineId ? { ...item, shopifyLineId: lineId } : item;
      })
    );
  };

  // Hydrate cart and sync live Shopify products
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mosaka_cart');
      if (saved) setCart(JSON.parse(saved));

      const savedCartId = localStorage.getItem('mosaka_shopify_cart_id');
      if (savedCartId) {
        setShopifyCartId(savedCartId);
        getShopifyCart(savedCartId).then((sc) => {
          if (sc?.checkoutUrl) {
            setShopifyCheckoutUrl(sc.checkoutUrl);
            syncLineIdsFromShopifyCart(sc);
          } else {
            localStorage.removeItem('mosaka_shopify_cart_id');
            setShopifyCartId(null);
          }
        });
      }
    } catch {}

    // Fetch live Shopify products and merge with local catalogue
    getShopifyProducts()
      .then((shopifyList) => {
        setShopifyConnected(true);
        if (shopifyList && shopifyList.length > 0) {
          const shopifyByHandle = new Map(shopifyList.map((p) => [p.slug, p]));
          const merged = catalogueProducts.map((localItem) => {
            const match = shopifyByHandle.get(localItem.slug);
            if (match) {
              shopifyByHandle.delete(localItem.slug);
              return mergeShopifyWithLocal(match, localItem);
            }
            return localItem;
          });
          const extras = Array.from(shopifyByHandle.values());
          setLiveProducts([...merged, ...extras]);
        }
      })
      .catch(() => {
        setShopifyConnected(false);
      });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('mosaka_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = async (product, quantity = 1, selectedVariant = null) => {
    const syncedProduct =
      liveProducts.find((p) => p.slug === product.slug || p.id === product.id) || product;

    const variantId = selectedVariant?.id || syncedProduct.shopifyVariantId || null;
    const itemKey = variantId ? `${syncedProduct.id}::${variantId}` : syncedProduct.id;
    const unitPrice = selectedVariant?.priceAmount ?? syncedProduct.price;
    const itemImage = selectedVariant?.image?.url || syncedProduct.image;
    const variantTitle =
      selectedVariant?.title && selectedVariant.title !== 'Default Title'
        ? selectedVariant.title
        : null;

    setCart((prev) => {
      const existing = prev.find(
        (item) => (item.cartKey || item.id) === itemKey
      );
      if (existing) {
        return prev.map((item) =>
          (item.cartKey || item.id) === itemKey
            ? { ...item, ...syncedProduct, cartKey: itemKey, shopifyVariantId: variantId, price: unitPrice, image: itemImage, variantTitle, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          ...syncedProduct,
          cartKey: itemKey,
          shopifyVariantId: variantId,
          price: unitPrice,
          image: itemImage,
          variantTitle,
          quantity,
        },
      ];
    });

    setNotification(
      `Added "${syncedProduct.name}${variantTitle ? ` (${variantTitle})` : ''}" to bag`
    );
    setTimeout(() => setNotification(null), 3200);

    // Sync with Shopify Cart API if this product has a Shopify variant ID
    if (variantId) {
      try {
        const lines = [{ merchandiseId: variantId, quantity }];
        let updatedCart;
        if (shopifyCartId) {
          updatedCart = await addToShopifyCart(shopifyCartId, lines);
        } else {
          updatedCart = await createShopifyCart(lines);
        }
        if (updatedCart?.id) {
          setShopifyCartId(updatedCart.id);
          setShopifyCheckoutUrl(updatedCart.checkoutUrl);
          localStorage.setItem('mosaka_shopify_cart_id', updatedCart.id);
          syncLineIdsFromShopifyCart(updatedCart);
        }
      } catch (err) {
        console.error('Shopify cart sync failed:', err);
      }
    }
  };

  const removeFromCart = async (idOrKey) => {
    const target = cart.find((item) => (item.cartKey || item.id) === idOrKey || item.id === idOrKey);
    setCart((prev) =>
      prev.filter((item) => (item.cartKey || item.id) !== idOrKey && item.id !== idOrKey)
    );

    if (shopifyCartId && target?.shopifyLineId) {
      try {
        const updatedCart = await removeFromShopifyCart(shopifyCartId, [target.shopifyLineId]);
        if (updatedCart?.checkoutUrl) {
          setShopifyCheckoutUrl(updatedCart.checkoutUrl);
        }
      } catch (err) {
        console.error('Shopify cart remove failed:', err);
      }
    }
  };

  const updateQuantity = async (idOrKey, delta) => {
    const target = cart.find((item) => (item.cartKey || item.id) === idOrKey || item.id === idOrKey);
    const nextQty = target ? target.quantity + delta : 0;

    setCart((prev) =>
      prev
        .map((item) => {
          if ((item.cartKey || item.id) === idOrKey || item.id === idOrKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );

    if (shopifyCartId && target?.shopifyLineId) {
      try {
        if (nextQty <= 0) {
          await removeFromShopifyCart(shopifyCartId, [target.shopifyLineId]);
        } else {
          const updatedCart = await updateShopifyCartLines(shopifyCartId, [
            { id: target.shopifyLineId, quantity: nextQty },
          ]);
          if (updatedCart?.checkoutUrl) {
            setShopifyCheckoutUrl(updatedCart.checkoutUrl);
          }
        }
      } catch (err) {
        console.error('Shopify cart update failed:', err);
      }
    }
  };

  const proceedToCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const shopifyLines = cart
        .filter((item) => item.shopifyVariantId)
        .map((item) => ({
          merchandiseId: item.shopifyVariantId,
          quantity: item.quantity,
        }));

      if (shopifyLines.length > 0) {
        const freshCart = await createShopifyCart(shopifyLines);
        if (freshCart?.checkoutUrl) {
          setShopifyCartId(freshCart.id);
          setShopifyCheckoutUrl(freshCart.checkoutUrl);
          localStorage.setItem('mosaka_shopify_cart_id', freshCart.id);
          window.location.href = freshCart.checkoutUrl;
          return { redirected: true, url: freshCart.checkoutUrl };
        }
      }

      if (shopifyCheckoutUrl) {
        window.location.href = shopifyCheckoutUrl;
        return { redirected: true, url: shopifyCheckoutUrl };
      }

      return { redirected: false, reason: 'no_shopify_variants' };
    } catch (err) {
      console.error('Checkout error:', err);
      return { redirected: false, reason: 'error' };
    } finally {
      setIsCheckingOut(false);
    }
  };

  const buyNow = async (product, quantity = 1, selectedVariant = null) => {
    const variantId = selectedVariant?.id || product.shopifyVariantId;
    if (!variantId) {
      openEnquiry(`Direct Order Inquiry: ${product.name} (${quantity} units)`);
      return false;
    }

    setIsCheckingOut(true);
    try {
      const freshCart = await createShopifyCart([{ merchandiseId: variantId, quantity }]);
      if (freshCart?.checkoutUrl) {
        window.location.href = freshCart.checkoutUrl;
        return true;
      }
      openEnquiry(`Direct Order Inquiry: ${product.name} (${quantity} units)`);
      return false;
    } catch (err) {
      console.error('Buy Now failed:', err);
      openEnquiry(`Direct Order Inquiry: ${product.name} (${quantity} units)`);
      return false;
    } finally {
      setIsCheckingOut(false);
    }
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const openEnquiry = (title) => {
    if (title) setEnquiryTitle(title);
    setIsEnquiryOpen(true);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        proceedToCheckout,
        buyNow,
        isCheckingOut,
        shopifyCheckoutUrl,
        shopifyConnected,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isEnquiryOpen,
        setIsEnquiryOpen,
        enquiryTitle,
        openEnquiry,
        quickViewProduct,
        setQuickViewProduct,
        notification,
        setNotification,
        products: liveProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
