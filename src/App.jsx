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
import AllProducts from './pages/AllProductsModal.jsx';
import ProductDetailModal from './pages/ProductDetailModal.jsx';
import ProfileModal from './pages/ProfileModal.jsx';

function App() {
  const {
    productsByCategory,
    showLogin,
    handleCloseLogin,
    showRegister,
    handleCloseRegister,
    showCart,
    handleCloseCart,
    showAllProducts,
    handleCloseAllProducts,
    showDetail,
    handleCloseDetail,
    currentProduct,
    user,
    showProfile,
    handleCloseProfile
  } = useContext(MainContext);
  const path = currentProduct.path

  const loginProps = { showLogin, handleCloseLogin };
  const registerProps = { showRegister, handleCloseRegister };
  const cartProps = { showCart, handleCloseCart };
  const allProductsProps = { showAllProducts, handleCloseAllProducts };
  const detailProps = { showDetail, handleCloseDetail, path };
  const profileProps = { showProfile, handleCloseProfile };
  const title = { title: 'También podría interesarte' };

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <NavigationBar />
      <HeaderSlider id='header-slider' />
      <div className='divider'></div>
      <OurProducts {...productsByCategory} />
      <div className='divider'></div>
      <FooterSlider {...title} />
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/all' element={<AllProducts {...allProductsProps} />} />
        <Route path='/login' element={<LoginModal {...loginProps} />} />
        <Route
          path='/register'
          element={<RegisterModal {...registerProps} />}
        />
        <Route path='/cart' element={<CartModal {...cartProps} />} />
        <Route path={currentProduct && `/products/${currentProduct.id}`} element={<ProductDetailModal {...detailProps} />} />
        <Route path={user && `/users/${user.id}`} element={<ProfileModal {...profileProps} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
