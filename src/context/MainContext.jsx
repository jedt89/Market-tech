import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainContext = React.createContext();

const MainContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [textSearched, setTextSearched] = useState('');
  const [currentProduct, setCurrentProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState(false);
  const [transactions, setTransactions] = useState([]);

  let currentSession = null;

  const handleReturnToHome = () => {
    navigate('/');
  };

  const showProductsByCategory = (products, id) => {
    const productsByCategory = products.filter(
      (product) => product.category_id === id
    );
    setProductsByCategory(productsByCategory);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.setItem('marketTechSession', null);
    navigate('/');
  };

  const setUserSession = async () => {
    let userSession = localStorage.getItem('marketTechSession');
    if (userSession && userSession !== 'null') {
      userSession = JSON.parse(userSession);
      const { data, token } = userSession;
      await setUser(data);
      await setToken(token);
      console.debug('Session active: ', data, token);
    }
    console.debug('No Session active');
  };

  useEffect(() => {
    if (!user) {
      setUserSession();
    }
  }, [user]);

  return (
    <MainContext.Provider
      value={{
        allProducts,
        setAllProducts,
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
        setTextSearched,
        handleLogout,
        setUserSession,
        currentSession,
        loading,
        setLoading,
        transactions,
        setTransactions
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
