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
  let currentSession = null

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
    setToken(null)
    setUser(null)
    localStorage.setItem('marketTechSession', null);
    navigate('/');
  };

  const setUserSession = () => {
    let userSession = localStorage.getItem('marketTechSession');
    if (userSession != 'null') {
      userSession = JSON.parse(userSession);
      setUser(userSession.data);
      setToken(userSession.token);
      currentSession = userSession.data
      currentSession.token = userSession.token
      console.debug('Session active: ', currentSession);
    }
  };

  useEffect(() => {
    if(!user) {
      setUserSession();
    }
  });


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
        setTextSearched,
        handleLogout,
        setUserSession,
        currentSession
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
