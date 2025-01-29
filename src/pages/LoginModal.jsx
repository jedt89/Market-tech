import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoIosClose } from "react-icons/io";

const LoginModal = ({ showLogin, handleCloseLogin }) => {
  return (
    <Modal show={showLogin} onHide={handleCloseLogin} centered backdrop="static">
      <Modal.Header className='text-warning display-flex justify-between align-items-center'>
        <Modal.Title className="modal-title">Iniciar sesión</Modal.Title>
        <IoIosClose className='text-white' onClick={handleCloseLogin} style={{cursor: 'pointer', fontSize: '26px'}} />
      </Modal.Header>
      <Modal.Body className="modal-body">
        <form>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" id="email" placeholder="Introduce tu correo" />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" placeholder="Introduce tu contraseña" />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleCloseLogin} className="modal-btn-cancel">Cerrar</Button>
        <Button variant="outline-warning" onClick={handleCloseLogin} className="modal-btn-submit">Iniciar sesión</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;