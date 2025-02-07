import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext.jsx';
import { Modal } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { Button } from 'react-bootstrap';
import { ModalContext } from '../context/ModalContext.jsx';
import { CartContext } from '../context/CartContext.jsx';
import useService from '../hooks/useService.jsx';

function ProductDetailModal() {
  const { currentProduct, token } = useContext(MainContext);
  const { showDetail, handleCloseDetail } = useContext(ModalContext);
  const { addProductToCart } = useContext(CartContext);
  const { image_url, price, title, description, id } = currentProduct;

  return (
    <Modal
      show={showDetail}
      onHide={() => handleCloseDetail(currentProduct.path)}
      centered
      backdrop='static'
    >
      <Modal.Header className='text-warning display-flex justify-between align-items-center'>
        <Modal.Title className='modal-title'>
          {currentProduct.title}
        </Modal.Title>
        <IoIosClose
          className='text-white'
          onClick={() => handleCloseDetail(currentProduct.path)}
          style={{ cursor: 'pointer', fontSize: '30px' }}
        />
      </Modal.Header>
      <Modal.Body className='modal-body text-white text-center'>
        <img src={currentProduct.image_url} className='width-100-percent' />
        <p>{currentProduct.description}</p>
        <p className='text-success' style={{ fontSize: '2rem' }}>
          $
          {currentProduct.price && currentProduct.price.toLocaleString('es-CL')}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-light'
          onClick={() => handleCloseDetail(currentProduct.path)}
          className='modal-btn-cancel'
        >
          Volver
        </Button>
        <Button
          variant='outline-warning'
          className='modal-btn-submit'
          onClick={() => {
            addProductToCart({ image_url, price, title, description, id });
            handleAddToCart(currentCart, token);
          }}
        >
          Agregar al carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductDetailModal;
