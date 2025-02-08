import React, { useContext } from 'react';
import { Modal, Button, ListGroup, Image } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { CartContext } from '../context/CartContext';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { PiTrashThin } from 'react-icons/pi';
import { MainContext } from '../context/MainContext';
import useService from '../hooks/useService';
import '../index.css';

const CartModal = () => {
  const {
    handleCleanCart,
    handleCreateTransaction,
    handleDeleteCartItem,
    handleUpdateCartItem
  } = useService();

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
          className='text-white close-icon'
          onClick={handleCloseCart}
        />
      </Modal.Header>
      <Modal.Body className='modal-body'>
        {!currentCart.products || currentCart.products.length === 0 ? (
          <p className='text-center text-white'>
            No tienes productos en tu carrito.
          </p>
        ) : (
          <ListGroup className='cart-list width-100-percent'>
            {currentCart.products.map((item, index) => (
              <ListGroup.Item
                key={index}
                className='d-flex justify-content-between align-items-center p-3 text-white border-yellow border-radius-8 cart-item background-transparent width-100-percent'
              >
                <div className='d-flex align-items-center gap-1rem'>
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    thumbnail
                    width='60'
                    className='mr-3'
                  />
                  <div>
                    <div>{item.title}</div>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-1rem'>
                  <div className='flex-column align-items-center justify-center'>
                    <div className='d-flex align-items-center gap-1rem cart-quantity'>
                      <CiSquareMinus
                        className='text-warning cart-icon'
                        onClick={() => {
                          decreaseProductQuantity(item.id);
                          handleUpdateCartItem(item.id, 'decrement', token);
                        }}
                      />
                      <span>{item.quantity}</span>
                      <CiSquarePlus
                        className='text-warning cart-icon'
                        onClick={() => {
                          addProductToCart(item, true);
                          handleUpdateCartItem(item.id, 'increment', token);
                        }}
                      />
                    </div>
                    <div className='text-center cart-subtotal'>
                      <small>${item.subTotal.toLocaleString('es-CL')}</small>
                    </div>
                  </div>
                  <PiTrashThin
                    className='cart-trash-icon'
                    onClick={() => {
                      removeProductFromCart(item.id);
                      handleDeleteCartItem(item.id);
                    }}
                  />
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <div className='width-100-percent d-flex justify-end text-warning'>
          <div
            className={`display-flex justify-${
              currentCart.products.length > 0 
                ? 'between' 
                : 'end'
            } align-items-center width-100-percent`}
          >
            {currentCart.products.length > 0 && (
              <Button
                variant='outline-danger btn-xs gap-1rem'
                onClick={() => {
                  clearCart()
                  handleCleanCart(token)}}
              >
                <PiTrashThin />
                Limpiar carrito
              </Button>
            )}
            <span className='h5 display'>
              ${currentCart.totalCart.toLocaleString('es-CL')}
            </span>
          </div>
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
            handleCleanCart();
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
