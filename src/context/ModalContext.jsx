import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../context/MainContext';

const ModalContext = React.createContext();

const ModalContextProvider = ({ children }) => {
  const { setCurrentProduct, setTextSearched, allProducts } =
    useContext(MainContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showTransaction, setShowTransaction] = useState(false);
  const [buy, setBuy] = useState(false);
  const navigate = useNavigate();

  const handleShowLogin = () => {
    setShowLogin(true);
    navigate('/login');
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
    navigate('/');
  };

  const handleShowRegister = () => {
    setShowRegister(true);
    navigate('/register');
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
    navigate('/');
  };

  const handleShowAllProducts = () => {
    setShowAllProducts(true);
    navigate('/all');
  };

  const handleCloseAllProducts = () => {
    setShowAllProducts(false);
    navigate('/');
    setTextSearched('');
  };

  const handleShowDetail = (id, path) => {
    const product = allProducts.find((item) => item.id == id);
    product.path = path.includes('/all') ? '/all' : '/';
    setCurrentProduct(product);
    setShowDetail(true);
    navigate(`/products/${id}`);
  };

  const handleCloseDetail = (path) => {
    setShowDetail(false);
    navigate(path);
  };

  const handleShowProfile = (id) => {
    setShowProfile(true);
    navigate(`/users/${id}`);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    navigate('/');
  };

  const handleShowTransaction = (id, buy) => {
    setShowTransaction(true);
    setBuy(buy);
    if (!buy) navigate(`/transaction/${id}`);
  };

  const handleCloseTransaction = (id, buy) => {
    setShowTransaction(false);
    setBuy(false);
    if (buy) {
      navigate('/');
    } else {
      navigate(`/users/${id}`);
    }
  };

  return (
    <ModalContext.Provider
      value={{
        showLogin,
        handleShowLogin,
        handleCloseLogin,
        showRegister,
        handleShowRegister,
        handleCloseRegister,
        showAllProducts,
        handleShowAllProducts,
        handleCloseAllProducts,
        showDetail,
        setShowDetail,
        handleShowDetail,
        handleCloseDetail,
        showProfile,
        handleShowProfile,
        handleCloseProfile,
        handleShowTransaction,
        handleCloseTransaction,
        showTransaction,
        setShowTransaction,
        buy,
        setBuy
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };
