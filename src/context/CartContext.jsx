import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
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
    const total = products.reduce(
      (total, product) => total + product.subTotal,
      0
    );
    return total;
  };

  const updateTotalCart = () => {
    setCurrentCart((prev) => {
      const total = getTotalPrice(prev.products);
      return {
        ...prev,
        totalCart: total
      };
    });
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
          subTotal:
            updatedCart.products[productIndex].price *
            (updatedCart.products[productIndex].quantity + 1)
        };
      } else {
        updatedCart.products.push({
          ...product,
          quantity: 1,
          subTotal: product.price
        });
      }
      const cart = {
        ...updatedCart,
        totalCart: getTotalPrice(updatedCart.products)
      };
      return cart;
    });
    toast.success('Producto añadido al carrito', { position: 'top-right' });
  };

  const removeProductFromCart = (productId) => {
    setCurrentCart((prev) => {
      const updatedCart = { ...prev };
      updatedCart.products = updatedCart.products.filter(
        (item) => item.id !== productId
      );

      const cart = {
        ...updatedCart,
        totalCart: getTotalPrice(updatedCart.products)
      };
      return cart;
    });
    toast.error('Producto eliminado del carrito', { position: 'top-right' });
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
            subTotal: product.price * (product.quantity - 1)
          };
        } else {
          updatedCart.products = updatedCart.products.filter(
            (item) => item.id !== productId
          );
          toast.error('Producto eliminado del carrito', {
            position: 'top-right'
          });
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
