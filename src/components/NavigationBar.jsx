import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import HeaderSearchBar from './HeaderSearchBar.jsx';
import { AiOutlineLogin } from 'react-icons/ai';
import { PiUserBold } from 'react-icons/pi';
import { RiLogoutCircleLine, RiUserAddLine } from 'react-icons/ri';
import { PiShoppingCart } from 'react-icons/pi';
import { Button } from 'react-bootstrap';
import { MainContext } from '../context/MainContext.jsx';
import { CartContext } from '../context/CartContext.jsx';
import { ModalContext } from '../context/ModalContext.jsx';
import '../index.css';
import toast from 'react-hot-toast';

const NavigationBar = () => {
  const { user, token, handleLogout } = useContext(MainContext);
  const { handleShowLogin, handleShowRegister, handleShowProfile } =
    useContext(ModalContext);

  const { currentCart, handleShowCart, clearCart } = useContext(CartContext);

  return (
    <Navbar expand='lg' className='navbar-container'>
      <Container className='navbar-container-padding'>
        <Navbar.Brand>
          <Link to='/'>
            <img
              src='../src/assets/img/brand.png'
              className='navbar-brand-img category-img'
              alt='Brand'
            />
          </Link>
        </Navbar.Brand>
        <HeaderSearchBar />
        <Nav>
          {token && (
            <div className='display-flex align-items-center gap-1rem'>
              <div className='text-warning'>{user.username}</div>
              <PiUserBold className='menu-icon menu-icon-margin' />
            </div>
          )}
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
            <Dropdown.Menu title='Menu'>
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
                  clearCart();
                }}
              >
                <RiLogoutCircleLine className='menu-icon menu-icon-margin' />
                <small className='text-black'>Logout</small>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
