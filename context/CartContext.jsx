'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as catalogueProducts } from '../data/products';
import {
  getShopifyProducts,
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
          // Merge Shopify variant IDs & live pricing into matching catalogue items, plus any new Shopify-only items
          const shopifyByHandle = new Map(shopifyList.map((p) => [p.slug, p]));
          const merged = catalogueProducts.map((localItem) => {
            const match = shopifyByHandle.get(localItem.slug);
            if (match) {
              shopifyByHandle.delete(localItem.slug);
              return {
                ...localItem,
                shopifyId: match.shopifyId,
                shopifyVariantId: match.shopifyVariantId,
                price: match.price > 0 ? match.price : localItem.price,
                priceFormatted: match.price > 0 ? match.priceFormatted : localItem.priceFormatted,
                isShopifyLive: true,
              };
            }
            return localItem;
          });
          // Append any extra products added directly in Shopify
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

  const addToCart = async (product, quantity = 1) => {
    // Find latest product metadata (with shopifyVariantId if synced)
    const syncedProduct =
      liveProducts.find((p) => p.slug === product.slug || p.id === product.id) || product;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === syncedProduct.id);
      if (existing) {
        return prev.map((item) =>
          item.id === syncedProduct.id
            ? { ...item, ...syncedProduct, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...syncedProduct, quantity }];
    });

    setNotification(`Added "${syncedProduct.name}" to bag`);
    setTimeout(() => setNotification(null), 3200);

    // Sync with Shopify Cart API if this product has a Shopify variant ID
    if (syncedProduct.shopifyVariantId) {
      try {
        const lines = [{ merchandiseId: syncedProduct.shopifyVariantId, quantity }];
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
        }
      } catch (err) {
        console.error('Shopify cart sync failed:', err);
      }
    }
  };

  const removeFromCart = async (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const proceedToCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // Collect any items with live Shopify variant IDs
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
