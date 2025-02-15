import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { ModalContext } from '../context/ModalContext.jsx';
import useInput from '../hooks/useInput.jsx';
import useService from '../hooks/useService.jsx';
import '../index.css';
import { MainContext } from '../context/MainContext.jsx';

const RegisterModal = () => {
  const { handleRegister, handleLogin } = useService();
  const { showRegister, handleCloseRegister } = useContext(ModalContext);
  const { setToken, token, setUser, setLoading, handleLogout } = useContext(MainContext);
  const email = useInput('');
  const password = useInput('');
  const confirmPassword = useInput('');
  const name = useInput('');
  const phone = useInput('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.value) newErrors.name = 'El nombre es requerido';
    if (!email.value) newErrors.email = 'El correo electrónico es requerido';
    else if (!/\S+@\S+\.\S+/.test(email.value))
      newErrors.email = 'El correo electrónico no es válido';
    if (!password.value) newErrors.password = 'La contraseña es requerida';
    else if (password.value.length < 6)
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    if (!confirmPassword.value)
      newErrors.confirmPassword = 'Repetir la contraseña es requerido';
    else if (password.value !== confirmPassword.value)
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!phone.value) newErrors.phone = 'El número telefónico es requerido';
    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      await handleRegister(
        email.value,
        name.value,
        phone.value,
        password.value
      );
      handleCloseRegister();
      if (token) {
        handleLogout();
        const user = await handleLogin(email.value, password.value);
        setUser(user);
        setToken(user.token);
      }
      setLoading(false);
    } else {
      setLoading(false);
      setErrors(formErrors);
    }
  };

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
          className='text-white close-icon'
          onClick={handleCloseRegister}
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
                setErrors({ ...errors, name: '' });
              }}
            />
            {errors.name && <div className='text-danger'>{errors.name}</div>}
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
                setErrors({ ...errors, email: '' });
              }}
            />
            {errors.email && <div className='text-danger'>{errors.email}</div>}
          </div>
          <div className='form-group'>
            <label htmlFor='phone' className='form-label'>
              Número telefónico
            </label>
            <input
              type='text'
              className='form-control'
              id='phone'
              value={phone.value}
              placeholder='Introduce tu número de teléfono'
              onChange={(event) => {
                phone.onChange(event);
                setErrors({ ...errors, phone: '' });
              }}
            />
            {errors.phone && <div className='text-danger'>{errors.phone}</div>}
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
                setErrors({ ...errors, password: '' });
              }}
            />
            {errors.password && (
              <div className='text-danger'>{errors.password}</div>
            )}
          </div>
          <div className='form-group'>
            <label htmlFor='confirmPassword' className='form-label'>
              Repetir Contraseña
            </label>
            <input
              type='password'
              className='form-control'
              id='confirmPassword'
              value={confirmPassword.value}
              placeholder='Repite tu contraseña'
              onChange={(event) => {
                confirmPassword.onChange(event);
                setErrors({ ...errors, confirmPassword: '' });
              }}
            />
            {errors.confirmPassword && (
              <div className='text-danger'>{errors.confirmPassword}</div>
            )}
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
          onClick={handleSubmit}
          className='modal-btn-submit'
        >
          Registrarse
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
