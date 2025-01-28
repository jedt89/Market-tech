import './App.css';
import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderSlider from './components/HeaderSlider.jsx';
import NavigationBar from './components/NavigationBar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer.jsx';
import OurProducts from './components/OurProducts.jsx';
import { MainContext } from './context/MainContext.jsx';
import FooterSlider from './components/FooterSlider.jsx';
import LoginModal from './pages/LoginModal.jsx';
import RegisterModal from './pages/RegisterModal.jsx';
import CartModal from './pages/CartModal.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  const {
    productsToShow,
    showLogin,
    handleCloseLogin,
    showRegister,
    handleCloseRegister,
    showCart,
    handleCloseCart
  } = useContext(MainContext);

  const loginProps = { showLogin, handleCloseLogin };
  const registerProps = { showRegister, handleCloseRegister };
  const cartProps = { showCart, handleCloseCart };

  const title = { title: 'También podría interesarte' };

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <NavigationBar />
      <HeaderSlider id='header-slider' />
      <div className='divider'></div>
      <OurProducts {...productsToShow} />
      <div className='divider'></div>
      <FooterSlider {...title} />
      <Routes>
        <Route
          path='/'
          element={
            <>
            </>
          }
        />
        <Route path='/login' element={<LoginModal {...loginProps} />} />
        <Route
          path='/register'
          element={<RegisterModal {...registerProps} />}
        />
        <Route path='/cart' element={<CartModal {...cartProps} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
