import './App.css';
import { useContext } from 'react';
import HeaderSlider from './components/HeaderSlider.jsx';
import NavigationBar from './components/NavigationBar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer.jsx';
import OurProducts from './components/OurProducts.jsx';
import { MainContext } from './context/MainContext.jsx';
import FooterSlider from './components/FooterSlider.jsx';
import LoginModal from './pages/LoginModal.jsx';
import RegisterModal from './pages/RegisterModal.jsx';

function App() {
  const {
    productsToShow,
    showLogin,
    handleCloseLogin,
    showRegister,
    handleCloseRegister
  } = useContext(MainContext);
  const title = { title: 'También podría interesarte' };

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <NavigationBar />
      <HeaderSlider id='header-slider' />
      <div
        style={{
          height: '1px',
          borderBottom: '1px solid #fab005',
          margin: '1rem 4rem'
        }}
      ></div>
      <OurProducts {...productsToShow} />
      <div
        style={{
          height: '1px',
          borderBottom: '1px solid #fab005',
          margin: '1rem 4rem'
        }}
      ></div>
      <FooterSlider {...title} />
      <Footer></Footer>
      <LoginModal show={showLogin} handleClose={handleCloseLogin} />
      <RegisterModal show={showRegister} handleClose={handleCloseRegister} />
    </div>
  );
}

export default App;
