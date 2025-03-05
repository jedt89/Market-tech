import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartContext = React.createContext();

const CartContextProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const [currentCart, setCurrentCart] = useState({
    products: [],
    totalCart: 0
  });

  const getTotalPrice = (products) => {
    if (products) {
      return products.reduce(
        (total, product) => total + Number(product.subtotal),
        0
      );
    }
    return 0;
  };

  const updateTotalCart = () => {
    setCurrentCart((prev) => ({
      ...prev,
      totalCart: getTotalPrice(prev.products)
    }));
  };

  const addProductToCart = (product) => {
    setCurrentCart((prev) => {
      const updatedCart = { ...prev };
      const productIndex = updatedCart.products.findIndex(
        (item) => item.id === product.id
      );

      if (productIndex !== -1) {
        updatedCart.products[productIndex] = {
          ...updatedCart.products[productIndex],
          quantity: updatedCart.products[productIndex].quantity + 1,
          subtotal:
            updatedCart.products[productIndex].price *
            (updatedCart.products[productIndex].quantity + 1)
        };
      } else {
        updatedCart.products.push({
          ...product,
          quantity: 1,
          subtotal: product.price
        });
      }

      return {
        ...updatedCart,
        totalCart: getTotalPrice(updatedCart.products)
      };
    });
  };

  const removeProductFromCart = (productId) => {
    setCurrentCart((prev) => {
      const updatedCart = {
        ...prev,
        products: prev.products.filter((item) => item.id !== productId)
      };

      return {
        ...updatedCart,
        totalCart: getTotalPrice(updatedCart.products)
      };
    });
  };

  const decreaseProductQuantity = (productId) => {
    setCurrentCart((prev) => {
      const updatedCart = { ...prev };
      const productIndex = updatedCart.products.findIndex(
        (item) => item.id === productId
      );

      if (productIndex !== -1) {
        const product = updatedCart.products[productIndex];

        if (product.quantity > 1) {
          updatedCart.products[productIndex] = {
            ...product,
            quantity: product.quantity - 1,
            subtotal: product.price * (product.quantity - 1)
          };
        } else {
          updatedCart.products = updatedCart.products.filter(
            (item) => item.id !== productId
          );
        }
      }

      return {
        ...updatedCart,
        totalCart: getTotalPrice(updatedCart.products)
      };
    });
  };

  const getTotalItems = () => {
    return currentCart.products.reduce(
      (total, product) => total + product.quantity,
      0
    );
  };

  const clearCart = () => {
    setCurrentCart({ products: [], totalCart: 0 });
  };

  const handleCloseCart = () => {
    setShowCart(false);
    navigate('/');
  };

  const handleShowCart = () => {
    setShowCart(true);
    navigate('/cart');
  };

  useEffect(() => {
    updateTotalCart();
  }, [currentCart.products]);

  return (
    <CartContext.Provider
      value={{
        currentCart,
        setCurrentCart,
        addProductToCart,
        removeProductFromCart,
        decreaseProductQuantity,
        getTotalPrice,
        getTotalItems,
        clearCart,
        handleShowCart,
        handleCloseCart,
        showCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
