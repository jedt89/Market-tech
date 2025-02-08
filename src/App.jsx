import { useContext, useEffect } from 'react';
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
import './index.css';

function App() {
  const { productsByCategory, currentProduct, user, getUserSession } =
    useContext(MainContext);

  useEffect(() => {
    getUserSession();
  }, []);

  return (
    <div className='app-container'>
      <NavigationBar />
      <HeaderSlider id='header-slider' />
      <div className='divider'></div>
      <OurProducts {...productsByCategory} />
      <div className='divider'></div>
      <FooterSlider title={'También podría interesarte'} />
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/all' element={<AllProducts />} />
        <Route path='/login' element={<LoginModal />} />
        <Route path='/register' element={<RegisterModal />} />
        <Route path='/cart' element={<CartModal />} />
        <Route
          path={currentProduct && `/products/${currentProduct.id}`}
          element={<ProductDetailModal />}
        />
        <Route path={user && `/users/${user.id}`} element={<ProfileModal />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
