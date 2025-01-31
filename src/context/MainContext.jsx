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
  const [user, setUser] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});

  // Modals
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

  const handleShowCart = () => {
    setShowCart(true);
    navigate('/cart');
  };

  const handleCloseCart = () => {
    setShowCart(false);
    navigate('/');
  };

  const handleShowAllProducts = () => {
    setShowAllProducts(true);
    navigate('/all');
  };

  const handleCloseAllProducts = () => {
    setShowAllProducts(false);
    navigate('/');
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

  const handleReturnToHome = () => {
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
        showProfile,
        handleShowProfile,
        handleCloseProfile,
        currentProduct,
        setCurrentProduct,
        handleReturnToHome,
        user,
        setUser
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
