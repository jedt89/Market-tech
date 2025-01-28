import React, { useState } from 'react';
import allProducts from '../models/allProducts.json';
import { shuffleProducts } from '../hooks/UseMain';
import { useNavigate } from 'react-router-dom';

const MainContext = React.createContext();

const MainContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const [productsToShow, setProductsToShow] = useState(
    shuffleProducts(allProducts)
  );

  const handleShowLogin = () => {
    console.log('handleShowLogin');
    setShowLogin(true);
    navigate('login');
  };

  const handleCloseLogin = () => {
    console.log('handleCloseLogin');
    setShowLogin(false);
    navigate('/');
  };

  const handleShowRegister = () => {
    console.log('handleShowRegister');
    setShowRegister(true);
    navigate('register');
  };

  const handleCloseRegister = () => {
    console.log('handleCloseRegister');
    setShowRegister(false);
    navigate('/');
  };

  const handleShowCart = () => {
    console.log('handleShowCart');
    setShowCart(true);
    navigate('cart');
  };
  
  const handleCloseCart = () => {
    console.log('handleCloseCart');
    setShowCart(false);
    navigate('/');
  };

  return (
    <MainContext.Provider
      value={{
        productsToShow,
        setProductsToShow,
        handleShowLogin,
        handleCloseLogin,
        handleShowRegister,
        handleCloseRegister,
        handleShowCart,
        handleCloseCart,
        showLogin,
        showRegister,
        showCart
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
