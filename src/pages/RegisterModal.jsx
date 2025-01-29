import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoIosClose } from "react-icons/io";


const RegisterModal = ({ showRegister, handleCloseRegister }) => {
  return (
    <Modal show={showRegister} onHide={handleCloseRegister} centered backdrop="static">
      <Modal.Header className='text-warning display-flex justify-between align-items-center'>
        <Modal.Title className="modal-title">Registrarse</Modal.Title>
        <IoIosClose className='text-white' onClick={handleCloseRegister} style={{cursor: 'pointer', fontSize: '26px'}}/>
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
        <Button variant="outline-secondary" onClick={handleCloseRegister} className="modal-btn-cancel">Cerrar</Button>
        <Button variant="outline-warning" onClick={handleCloseRegister} className="modal-btn-submit">Registrarse</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
