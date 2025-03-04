import React, { useContext } from 'react';
import { Modal, Button, ListGroup, Image } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { CartContext } from '../context/CartContext';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { MainContext } from '../context/MainContext';
import { FaRegTrashAlt } from 'react-icons/fa';
import { TfiShoppingCart } from 'react-icons/tfi';
import useService from '../hooks/useService';
import '../index.css';
import { ModalContext } from '../context/ModalContext';
import { PiTrashThin } from 'react-icons/pi';
import { BsCart4, BsCartX } from 'react-icons/bs';

const CartModal = () => {
  const {
    handleCleanCart,
    handleCreateTransaction,
    handleDeleteCartItem,
    handleUpdateCartItem,
    handleGetCartItems
  } = useService();

  const {
    currentCart,
    showCart,
    handleCloseCart,
    setCurrentCart,
    getTotalPrice
  } = useContext(CartContext);
  const { token, user, setLoading, setCurrentTransaction } =
    useContext(MainContext);
  const { handleShowTransaction } = useContext(ModalContext);

  const buyCart = async (token, currentCart) => {
    await handleCreateTransaction(token, currentCart);
    setCurrentTransaction((prev) => {
      return {
        ...prev,
        total: currentCart.total_price
      };
    });

    const cart = await fetchCart();
    setCurrentCart(cart);
    setLoading(false);
    handleCloseCart();
    handleShowTransaction(null, true);
  };

  const fetchCart = async () => {
    setLoading(true);
    try {
      if (user) {
        const cartItems = await handleGetCartItems(token, user.id);
        const cart = {
          products: cartItems,
          totalCart: getTotalPrice(cartItems)
        };
        return cart;
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching cart:', error);
    }
  };

  const actionForCartItem = async (action, item) => {
    const id = item.product_id ? item.product_id : item.id;
    setLoading(true);

    if (['increment', 'decrement'].includes(action)) {
      await handleUpdateCartItem(id, action, token);
    }

    if (action == 'delete') {
      await handleDeleteCartItem(id, token);
    }

    const cart = await fetchCart();
    setCurrentCart(cart);
    setLoading(false);
  };

  const clearCart = async () => {
    await handleCleanCart(token);
    const cart = await fetchCart();
    setCurrentCart(cart);
    setLoading(false);
  };
console.log('currentCart', currentCart)
  return (
    <Modal
      show={showCart}
      onHide={handleCloseCart}
      centered
      backdrop='static'
      size='md'
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
          <div className='flex-column justify-center align-items-center gap-1rem'>
            <BsCartX className='text-info' style={{ fontSize: '4rem' }} />
            <p className='text-center text-white'>
              No tienes productos en tu carrito.
            </p>
          </div>
        ) : (
          <ListGroup className='cart-list width-100-percent'>
            {currentCart.products &&
              currentCart.products.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  className='text-white border-yellow border-radius-8 cart-item background-transparent width-100-percent padding0'
                >
                  <div className='d-flex justify-content-between align-items-center card-body-cart p-2'>
                    <div className='d-flex align-items-center gap-1rem width-100-percent'>
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        thumbnail
                        width='60'
                        className='mr-3'
                      />
                      <div className='width-100-percent'>
                        <small>{item.title}</small>
                        <div className='display-flex align-items-center justify-between width-100-percent'>
                          <div className='text-center cart-subtotal'>
                            <small>
                              <small className='italic text-warning'>
                                Subtotal:{' '}
                              </small>
                              ${item.subtotal.toLocaleString('es-CL')}
                            </small>
                          </div>
                          <div className='d-flex align-items-center gap-05rem cart-quantity'>
                            {item.quantity > 1 ? (
                              <CiSquareMinus
                                className='text-warning cart-icon'
                                onClick={() => {
                                  actionForCartItem('decrement', item);
                                }}
                              />
                            ) : (
                              <PiTrashThin
                                className='text-danger cart-icon'
                                onClick={() =>
                                  actionForCartItem('delete', item)
                                }
                              />
                            )}
                            <span>{item.quantity}</span>
                            <CiSquarePlus
                              className='text-warning cart-icon'
                              onClick={() => {
                                actionForCartItem('increment', item);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
        <div
          className='width-100-percent d-flex justify-end text-warning'
          style={{ paddingTop: '2rem' }}
        >
          <div
            className={`display-flex justify-${
              currentCart.products.length > 0 ? 'between' : 'end'
            } align-items-center width-100-percent`}
          >
            {currentCart.products.length > 0 && (
              <div
                className='text-danger display-flex align-items-center gap-05rem cursor-pointer'
                onClick={() => {
                  clearCart();
                }}
              >
                <FaRegTrashAlt />
                Limpiar carrito
              </div>
            )}
            <span className='h5 product-price'>
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
          onClick={() => buyCart(token, currentCart)}
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
