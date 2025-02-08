import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { TbHome } from 'react-icons/tb';
import notFound from '../assets/img/notFound.png';
import '../index.css';

const NotFound = () => {
  return (
    <div className='flex-column align-items-center not-found-container'>
      <img src={notFound} alt='Not Found' />
      <div className='not-found-text'>
        Ups! Tenemos un problema cargando tu solicitud. Por favor recarga la
        página o haz clic en el siguiente botón para volver a la pantalla de
        inicio.
      </div>
      <Button
        className='head-button not-found-button'
        variant='ghost'
        color='warning'
      >
        <TbHome />
        <Link to='/' className='not-found-link'>
          <span>Ir al Inicio</span>
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
