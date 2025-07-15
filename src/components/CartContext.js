import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const alreadyInCart = prevCart.some(
        (cartItem) => cartItem.id === item.id
      );
      if (alreadyInCart) {
        toast.info("Item already in cart");
        return prevCart;
      }

      const updated = [...prevCart, item];
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const cartCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, cartCount, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
