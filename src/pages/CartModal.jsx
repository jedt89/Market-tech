import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { IoIosClose } from "react-icons/io";

const CartModal = ({ showCart, handleCloseCart, cartItems, total }) => {
  return (
    <Modal show={showCart} onHide={handleCloseCart} centered backdrop="static">
      <Modal.Header className='text-warning display-flex justify-between align-items-center'>
        <Modal.Title className="modal-title">Carrito de Compras</Modal.Title>
        <IoIosClose className='text-white' onClick={handleCloseCart} style={{cursor: 'pointer', fontSize: '26px'}} />
      </Modal.Header>
      <Modal.Body className="modal-body text-white">
        {!cartItems || cartItems.length === 0 ? (
          <p>No tienes productos en tu carrito.</p>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between">
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.description}</p>
                </div>
                <div className="text-right">
                  <span>{item.quantity} x ${item.price}</span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <hr />
        <div className="d-flex justify-content-between text-white">
          <strong>Total:</strong>
          <span>${total}</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleCloseCart} className="modal-btn-cancel">Cerrar</Button>
        <Button variant="outline-warning" onClick={handleCloseCart} className="modal-btn-submit">Realizar Compra</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
