import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { handleLogin } from '../hooks/useService';
import useInput from '../hooks/useInput';
import { MainContext } from '../context/MainContext';

const LoginModal = ({ showLogin, handleCloseLogin }) => {
  const { setUser, setToken } = useContext(MainContext);
  const email = useInput('');
  const password = useInput('');

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
          className='text-white'
          onClick={handleCloseLogin}
          style={{ cursor: 'pointer', fontSize: '26px' }}
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
        </form>
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
          onClick={async () => {
            const user = await handleLogin(email.value, password.value);
            setUser(user);
            setToken(user.token);
            handleCloseLogin();
          }}
          className='modal-btn-submit'
        >
          Iniciar sesión
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
