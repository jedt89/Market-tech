import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainContext = React.createContext();

const MainContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [token, setToken] = useState(false);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});

  const handleShowLogin = () => {
    console.log('handleShowLogin');
    setShowLogin(true);
    navigate('/login');
  };

  const handleCloseLogin = () => {
    console.log('handleCloseLogin');
    setShowLogin(false);
    navigate('/');
  };

  const handleShowRegister = () => {
    console.log('handleShowRegister');
    setShowRegister(true);
    navigate('/register');
  };

  const handleCloseRegister = () => {
    console.log('handleCloseRegister');
    setShowRegister(false);
    navigate('/');
  };

  const handleShowCart = () => {
    console.log('handleShowCart');
    setShowCart(true);
    navigate('/cart');
  };

  const handleCloseCart = () => {
    console.log('handleCloseCart');
    setShowCart(false);
    navigate('/');
  };

  const handleShowAllProducts = () => {
    console.log('handleShowAllProducts');
    setShowAllProducts(true);
    navigate('/all');
  };

  const handleCloseAllProducts = () => {
    console.log('handleCloseAllProducts');
    setShowAllProducts(false);
    navigate('/');
  };

  const handleShowDetail = (id, path) => {
    console.log('handleShowDetail');
    const product = allProducts.find((item) => item.id == id);
    product.path = path.includes('/all') ? '/all' : '/';
    setCurrentProduct(product);
    setShowDetail(true);
    navigate(`/products/${id}`);
  };

  const handleCloseDetail = (path) => {
    console.log('handleCloseDetail');
    setShowDetail(false);
    navigate(path);
  };

  const handleReturnToHome = () => {
    console.log('handleReturnToHome');
    navigate('/');
  };

  const showProductsByCategory = (products, id) => {
    const productsByCategory = products.filter(
      (product) => product.category_id === id
    );
    setProductsByCategory(productsByCategory);
  };

  return (
    <MainContext.Provider
      value={{
        allProducts,
        setAllProducts,
        productsByCategory,
        setProductsByCategory,
        handleShowLogin,
        handleCloseLogin,
        handleShowRegister,
        handleCloseRegister,
        handleShowCart,
        handleCloseCart,
        showLogin,
        showRegister,
        showCart,
        showAllProducts,
        handleShowAllProducts,
        handleCloseAllProducts,
        token,
        setToken,
        showProductsByCategory,
        showDetail,
        setShowDetail,
        handleShowDetail,
        handleCloseDetail,
        currentProduct,
        setCurrentProduct,
        handleReturnToHome
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
