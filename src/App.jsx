import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainContext } from './context/MainContext.jsx';
import { SyncLoader } from 'react-spinners';
import { ModalContext } from './context/ModalContext.jsx';
import HeaderSlider from './components/HeaderSlider.jsx';
import NavigationBar from './components/NavigationBar.jsx';
import Footer from './components/Footer.jsx';
import OurProducts from './components/OurProducts.jsx';
import FooterSlider from './components/FooterSlider.jsx';
import LoginModal from './pages/LoginModal.jsx';
import RegisterModal from './pages/RegisterModal.jsx';
import CartModal from './pages/CartModal.jsx';
import NotFound from './pages/NotFound.jsx';
import AllProducts from './pages/AllProductsModal.jsx';
import ProductDetailModal from './pages/ProductDetailModal.jsx';
import ProfileModal from './pages/ProfileModal.jsx';
import useService from './hooks/useService.jsx';
import TransactionModal from './pages/TransactionModal.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  const {
    currentProduct,
    user,
    setAllProducts,
    loading,
    setLoading,
    currentTransaction
  } = useContext(MainContext);
  const { showTransaction } = useContext(ModalContext);
  const { handleGetProducts } = useService();

  const fetchAllProducts = async () => {
    setLoading(true);
    const products = await handleGetProducts();
    if (products && products.length > 0) {
      setAllProducts(products);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className='app-container'>
      <NavigationBar />
      <HeaderSlider id='header-slider' />
      <div className='divider'></div>
      <OurProducts />
      <div className='divider'></div>
      <FooterSlider title={'También podría interesarte'} />
      {showTransaction && <TransactionModal />}
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
        <Route
          path={
            currentTransaction &&
            `/transaction/${currentTransaction.transaction_id}`
          }
          element={<TransactionModal />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      {loading && (
        <div className='loader'>
          <SyncLoader
            color='#ffc107'
            loading={loading}
            size={10}
            speedMultiplier={0.7}
          />
        </div>
      )}
    </div>
  );
}

export default App;
