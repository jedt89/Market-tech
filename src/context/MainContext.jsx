import React, { useState } from 'react';
import allProducts from '../models/allProducts.json';
import { shuffleProducts } from '../hooks/UseMain';

const MainContext = React.createContext();

const MainContextProvider = ({ children }) => {
  const [productsToShow, setProductsToShow] = useState(
    shuffleProducts(allProducts)
  );
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  return (
    <MainContext.Provider
      value={{
        productsToShow,
        setProductsToShow,
        handleShowLogin,
        handleCloseLogin,
        handleShowRegister,
        handleCloseRegister,
        showLogin,
        showRegister,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
