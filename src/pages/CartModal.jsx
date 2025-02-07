import React, { useContext } from 'react';
import { Modal, Button, ListGroup, Image } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { CartContext } from '../context/CartContext';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { PiTrashThin } from 'react-icons/pi';
import { MainContext } from '../context/MainContext';
import useService from '../hooks/useService';

const CartModal = () => {
  const { handleAddToCart, handleCreateTransaction, handleDeleteCartItem, handleUpdateCartItem } = useService();

  const {
    currentCart,
    removeProductFromCart,
    addProductToCart,
    decreaseProductQuantity,
    showCart,
    handleCloseCart,
    clearCart
  } = useContext(CartContext);
  const { token } = useContext(MainContext);

  return (
    <Modal
      show={showCart}
      onHide={handleCloseCart}
      centered
      backdrop='static'
      size='lg'
    >
      <Modal.Header className='text-white d-flex justify-content-between align-items-center'>
        <Modal.Title className='modal-title'>Carrito de Compras</Modal.Title>
        <IoIosClose
          className='text-white'
          onClick={handleCloseCart}
          style={{ cursor: 'pointer', fontSize: '30px' }}
        />
      </Modal.Header>
      <Modal.Body className='modal-body'>
        {!currentCart.products || currentCart.products.length === 0 ? (
          <p className='text-center text-white'>
            No tienes productos en tu carrito.
          </p>
        ) : (
          <ListGroup
            style={{
              maxHeight: '500px',
              height: '500px',
              overflowX: 'hidden',
              overflowY: 'scroll',
              padding: '1rem'
            }}
          >
            {currentCart.products.map((item, index) => (
              <ListGroup.Item
                key={index}
                className='d-flex justify-content-between align-items-center p-3 text-white border-yellow border-radius-8'
                style={{ backgroundColor: 'transparent', marginBottom: '1rem' }}
              >
                <div className='d-flex align-items-center gap-1rem'>
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    thumbnail
                    width='60'
                    className='mr-3'
                  />
                  <div>
                    <strong>{item.name}</strong>
                    <p className='text-white'>{item.description}</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-1rem'>
                  <div className='flex-column align-items-center justify-center'>
                    <div className='d-flex align-items-center gap-1rem' style={{marginRight: '1rem'}}>
                      <CiSquareMinus
                        className='text-warning'
                        style={{
                          fontSize: '30px',
                          color: 'red',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          decreaseProductQuantity(item.id)
                          handleUpdateCartItem(item.id, 'decrement', token)
                        }}
                      />
                      <span>{item.quantity}</span>
                      <CiSquarePlus
                        className='text-warning'
                        style={{
                          fontSize: '30px',
                          color: 'red',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          addProductToCart(item, true);
                          handleUpdateCartItem(item.id, 'increment', token)
                        }}
                      />
                    </div>
                    <div className='text-center' style={{ paddingTop: '5px' }}>
                      <small>${item.subTotal.toLocaleString('es-CL')}</small>
                    </div>
                  </div>
                  <PiTrashThin
                    style={{
                      fontSize: '28px',
                      color: 'red',
                      cursor: 'pointer',
                      marginLeft: '2rem'
                    }}
                    onClick={() => {
                      removeProductFromCart(item.id)
                      handleDeleteCartItem(item.id)
                    }}
                  />
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <div className='width-100-percent d-flex justify-end text-warning'>
          <span className='h5'>
            ${currentCart.totalCart.toLocaleString('es-CL')}
          </span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-light'
          onClick={handleCloseCart}
          className='modal-btn-cancel'
        >
          Cerrar
        </Button>
        <Button
          variant='outline-warning'
          onClick={() => {
            handleCreateTransaction(currentCart, token);
            handleCloseCart();
            clearCart()
          }}
          className='modal-btn-submit'
          disabled={currentCart.products.length == 0}
        >
          Realizar Compra
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
