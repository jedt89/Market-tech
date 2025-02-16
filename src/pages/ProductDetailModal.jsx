import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext.jsx';
import { Modal, Button } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { ModalContext } from '../context/ModalContext.jsx';
import { CartContext } from '../context/CartContext.jsx';
import useService from '../hooks/useService.jsx';
import '../index.css';

function ProductDetailModal() {
  const { currentProduct, token, loading, setLoading, user } =
    useContext(MainContext);
  const { showDetail, handleCloseDetail } = useContext(ModalContext);
  const { addProductToCart } = useContext(CartContext);
  const { handleAddToCart } = useService();
  const { image_url, price, title, description, id, quantity, subTotal } =
    currentProduct;

  const addProductToCurrentCart = async () => {
    setLoading(true);
    await addProductToCart({
      image_url,
      price,
      title,
      description,
      id,
      quantity,
      subTotal
    });
    await handleAddToCart(
      {
        image_url,
        price,
        title,
        description,
        id,
        quantity,
        subTotal
      },
      token,
      user.id
    );
    setLoading(false);
  };

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
          className='text-white close-icon'
          onClick={() => handleCloseDetail(currentProduct.path)}
        />
      </Modal.Header>
      <Modal.Body className='modal-body text-white text-center'>
        <img
          src={currentProduct.image_url}
          className='width-100-percent'
          alt={currentProduct.title}
        />
        <p>{currentProduct.description}</p>
        <p className='text-success product-price'>
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
          disabled={loading}
          onClick={addProductToCurrentCart}
        >
          Agregar al carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductDetailModal;
