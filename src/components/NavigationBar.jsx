import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLogin } from 'react-icons/ai';
import { PiUserBold } from 'react-icons/pi';
import { RiLogoutCircleLine, RiUserAddLine } from 'react-icons/ri';
import { PiShoppingCart } from 'react-icons/pi';
import { Button } from 'react-bootstrap';
import { MainContext } from '../context/MainContext.jsx';
import { CartContext } from '../context/CartContext.jsx';
import { ModalContext } from '../context/ModalContext.jsx';
import { brandImgLogo } from '../assets/index.js';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import HeaderSearchBar from './HeaderSearchBar.jsx';
import toast from 'react-hot-toast';
import useService from '../hooks/useService.jsx';
import '../index.css';

const NavigationBar = () => {
  const { user, token, handleLogout, setLoading } = useContext(MainContext);
  const { handleShowLogin, handleShowRegister, handleShowProfile } =
    useContext(ModalContext);

  const { currentCart, handleShowCart, setCurrentCart, getTotalPrice } =
    useContext(CartContext);
  const { handleGetCartItems } = useService();

  const fetchCart = async () => {
    setLoading(true);
    try {
      if (user) {
        const cartItems = await handleGetCartItems(token, user.id);
        let cart = {
          products: cartItems,
          totalCart: getTotalPrice(cartItems)
        };
        setCurrentCart(cart);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  return (
    <Navbar expand='lg' className='navbar-container'>
      <Container className='navbar-container-padding gap-1rem'>
        <div className='nav-brand-user'>
          <Navbar.Brand>
            <Link to='/'>
              <img
                src={brandImgLogo}
                className='navbar-brand-img category-img'
                alt='Brand'
              />
            </Link>
          </Navbar.Brand>
          {token && (
            <div className='display-flex align-items-center justify-center gap-05rem'>
              <PiUserBold className='menu-icon' />
              <div className='text-warning'>{user.username}</div>
            </div>
          )}
        </div>
        <HeaderSearchBar />
        <Nav>
          <div className='display-flex align-items-center'>
            {token && (
              <Button
                className='navbar-button navbar-button-margin d-flex align-items-center gap-1rem'
                variant='outline-warning'
                onClick={handleShowCart}
              >
                <PiShoppingCart className='menu-icon' />
                <span>$ {currentCart.totalCart.toLocaleString('es-CL')}</span>
              </Button>
            )}
            <Dropdown>
              <Dropdown.Toggle
                className='navbar-button'
                variant='outline-warning'
              >
                <small className='text-warning'>Menu</small>
              </Dropdown.Toggle>
              <Dropdown.Menu title='Menu' align={'end'}>
                <Dropdown.Item onClick={handleShowLogin} disabled={token}>
                  <AiOutlineLogin className='menu-icon menu-icon-margin' />
                  <small className='text-black'>Ingresar</small>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleShowRegister}>
                  <RiUserAddLine className='menu-icon menu-icon-margin' />
                  <small className='text-black'>Registrarse</small>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    handleShowProfile(user.id);
                  }}
                  disabled={!token}
                >
                  <PiUserBold className='menu-icon menu-icon-margin' />
                  <small className='text-black'>Cuenta</small>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  disabled={!token}
                  onClick={() => {
                    handleLogout();
                    toast.success('Sessión cerrada con éxito', {
                      position: 'top-right'
                    });
                  }}
                >
                  <RiLogoutCircleLine className='menu-icon menu-icon-margin' />
                  <small className='text-black'>Logout</small>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
