'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const initialProducts = [
  {
    id: 'amezon',
    name: 'Amezon Basin',
    price: 5950,
    category: 'Wooden Basins',
    material: 'Petrified & Carved Teak Root Live Edge',
    dimensions: '620mm x 440mm x 150mm',
    finish: 'Natural Matte Satin Sealant',
    image: '/images/prod_amezon_exact.jpg',
    hires: '/images/prod_amazon_hires.jpg',
    description: 'Each Amezon Basin is sculpted from reclaimed ancient teak root. The organic live edge contours celebrate nature’s untamed geometry.',
  },
  {
    id: 'nile',
    name: 'Nile Basin',
    price: 6450,
    category: 'Copper & Brass',
    material: 'Hand-Hammered Solid Copper',
    dimensions: '580mm x 410mm x 140mm',
    finish: 'Living Patina Aged Bronze',
    image: '/images/prod_nile_exact.jpg',
    hires: '/images/col_copper_hires.jpg',
    description: 'Forged by master artisans with over 4,000 hand-hammered dimples that refract candlelight into a warm, hypnotic glow.',
  },
  {
    id: 'emerald',
    name: 'Emerald Basin',
    price: 7250,
    category: 'Statement Basins',
    material: 'Rare Verde Guatemala Natural Marble',
    dimensions: '550mm x 480mm x 135mm',
    finish: 'Honed Satin Fluted Edge',
    image: '/images/prod_emerald_exact.jpg',
    hires: '/images/col_statement_hires.jpg',
    description: 'Carved from an unbroken block of deep green serpentine marble with undulating organic ripples reminiscent of calm alpine waters.',
  },
  {
    id: 'tectona',
    name: 'Tectona Basin',
    price: 5850,
    category: 'Wooden Basins',
    material: 'Burmese Solid Heartwood Teak',
    dimensions: '420mm Dia x 140mm H',
    finish: 'Marine-Grade Nanotech Natural Finish',
    image: '/images/prod_tectona_exact.jpg',
    hires: '/images/prod_tectona_hires.jpg',
    description: 'Turned on a precision lathe and hand-burnished to reveal concentric growth rings. Warm to the touch and naturally waterproof.',
  },
];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryTitle, setEnquiryTitle] = useState('Enquire About The Collection');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mosaka_cart');
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('mosaka_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    setNotification(`Added "${product.name}" to bag`);
    setTimeout(() => setNotification(null), 3200);
  };

  const removeFromCart = (id) => {
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
        products: initialProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
