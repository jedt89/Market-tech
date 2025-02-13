import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { MainContext } from '../context/MainContext';
import { ModalContext } from '../context/ModalContext';
import useService from '../hooks/useService';
import useInput from '../hooks/useInput';
import '../index.css';

const LoginModal = () => {
  const { handleLogin } = useService();
  const { setUser, setToken } = useContext(MainContext);
  const { showLogin, handleCloseLogin, handleShowRegister } =
    useContext(ModalContext);
  const email = useInput('');
  const password = useInput('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!email.value) {
      setError('El correo electrónico es obligatorio.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email.value)) {
      setError('El correo electrónico no es válido.');
      return false;
    }
    if (!password.value) {
      setError('La contraseña es obligatoria.');
      return false;
    }
    if (password.value.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const user = await handleLogin(email.value, password.value);
        setUser(user);
        setToken(user.token);
        handleCloseLogin();
      } catch (err) {
        setError('Error al iniciar sesión. Por favor, verifica los datos.');
      }
    }
  };

  return (
    <Modal
      show={showLogin}
      onHide={handleCloseLogin}
      centered
      backdrop='static'
    >
      <Modal.Header className='text-warning display-flex justify-between align-items-center'>
        <Modal.Title className='modal-title'>Iniciar sesión</Modal.Title>
        <IoIosClose
          className='text-white close-icon'
          onClick={handleCloseLogin}
        />
      </Modal.Header>
      <Modal.Body className='modal-body'>
        <form className='width-100-percent'>
          <div className='form-group'>
            <label htmlFor='email' className='form-label'>
              Correo electrónico
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='Introduce tu correo'
              value={email.value}
              onChange={(event) => {
                email.onChange(event);
              }}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password' className='form-label'>
              Contraseña
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Introduce tu contraseña'
              value={password.value}
              onChange={(event) => {
                password.onChange(event);
              }}
            />
          </div>
          {error && <div className='text-danger'>{error}</div>}
        </form>
        <p className='text-white'>
          ¿No tienes cuenta?{' '}
          <span
            className='text-warning register-link'
            onClick={() => {
              handleCloseLogin();
              handleShowRegister();
            }}
          >
            Regístrate
          </span>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-light'
          onClick={handleCloseLogin}
          className='modal-btn-cancel'
        >
          Cerrar
        </Button>
        <Button
          variant='outline-warning'
          onClick={handleSubmit}
          className='modal-btn-submit'
        >
          Iniciar sesión
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
