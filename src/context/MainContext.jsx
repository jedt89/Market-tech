import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainContext = React.createContext();

const MainContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [categorySelected, setCategorySelected] = useState(1);
  const [textSearched, setTextSearched] = useState('');
  const [currentProduct, setCurrentProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const handleReturnToHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.setItem('marketTechSession', null);
    navigate('/');
  };

  const setUserSession = async () => {
    let userSession = localStorage.getItem('marketTechSession');
    if (userSession === 'null') {
      userSession = null;
    }

    if (userSession) {
      userSession = JSON.parse(userSession);
      const { data, token } = userSession;
      await setUser(data);
      await setToken(token);
      console.debug('Session active: ', data, token);
    } else {
      console.debug('No Session active');
    }
  };

  useEffect(() => {
    setUserSession();
  }, []);

  return (
    <MainContext.Provider
      value={{
        allProducts,
        setAllProducts,
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
        loading,
        setLoading,
        transactions,
        setTransactions,
        categorySelected,
        setCategorySelected,
        currentTransaction,
        setCurrentTransaction
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
