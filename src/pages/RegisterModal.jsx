import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import useInput from '../hooks/useInput.jsx';
import { handleRegister } from '../hooks/useService.jsx';

const RegisterModal = ({ showRegister, handleCloseRegister }) => {
  const email = useInput('');
  const password = useInput('');
  const name = useInput('');

  return (
    <Modal
      show={showRegister}
      onHide={handleCloseRegister}
      centered
      backdrop='static'
    >
      <Modal.Header className='text-warning display-flex justify-between align-items-center'>
        <Modal.Title className='modal-title'>Registrarse</Modal.Title>
        <IoIosClose
          className='text-white'
          onClick={handleCloseRegister}
          style={{ cursor: 'pointer', fontSize: '26px' }}
        />
      </Modal.Header>
      <Modal.Body className='modal-body'>
        <form className='width-100-percent'>
          <div className='form-group'>
            <label htmlFor='name' className='form-label'>
              Nombre
            </label>
            <input
              type='text'
              className='form-control'
              id='name'
              value={name.value}
              placeholder='Introduce tu nombre'
              onChange={(event) => {
                name.onChange(event);
              }}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email' className='form-label'>
              Correo electrónico
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              value={email.value}
              placeholder='Introduce tu correo'
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
              value={password.value}
              placeholder='Introduce tu contraseña'
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
          onClick={handleCloseRegister}
          className='modal-btn-cancel'
        >
          Cerrar
        </Button>
        <Button
          variant='outline-warning'
          onClick={() => {
            handleRegister(email.value, password.value, name.value);
          }}
          className='modal-btn-submit'
        >
          Registrarse
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
