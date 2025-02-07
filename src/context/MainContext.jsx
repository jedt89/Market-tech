import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainContext = React.createContext();

const MainContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [textSearched, setTextSearched] = useState('');
  const [currentProduct, setCurrentProduct] = useState({});
  const [user, setUser] = useState({});
  const [token, setToken] = useState({});

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
        productsByCategory,
        setProductsByCategory,
        showProductsByCategory,
        currentProduct,
        setCurrentProduct,
        handleReturnToHome,
        user,
        setUser,
        token,
        setToken,
        textSearched,
        setTextSearched
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
