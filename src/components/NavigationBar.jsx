import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AiOutlineLogin } from 'react-icons/ai';
import { PiUserBold } from 'react-icons/pi';
import { RiLogoutCircleLine, RiUserAddLine } from 'react-icons/ri';
import { PiShoppingCart } from 'react-icons/pi';
import { Button } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar expand='lg' style={{ width: '100%' }}>
      <Container>
        <Navbar.Brand href='#home'>Market-Tech</Navbar.Brand>
        <Nav>
          <Button variant='outline-warning'>
            <PiShoppingCart className='menu-icon' />
          </Button>
          <NavDropdown title='Menu'>
            <NavDropdown.Item>
              <AiOutlineLogin className='menu-icon' />
              <small>Ingresar</small>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <RiUserAddLine className='menu-icon' />
              <small>Registrarse</small>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <PiUserBold className='menu-icon' />
              <small>Cuenta</small>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <RiLogoutCircleLine className='menu-icon' />
              <small>Logout</small>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
