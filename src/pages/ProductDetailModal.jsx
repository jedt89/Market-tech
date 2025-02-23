import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext.jsx';
import { Modal, Button } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { ModalContext } from '../context/ModalContext.jsx';
import { CartContext } from '../context/CartContext.jsx';
import useService from '../hooks/useService.jsx';
import '../index.css';
import { BsCartPlus } from 'react-icons/bs';

function ProductDetailModal() {
  const { currentProduct, token, loading, setLoading, user } =
    useContext(MainContext);
  const { showDetail, handleCloseDetail } = useContext(ModalContext);
  const { addProductToCart } = useContext(CartContext);
  const { handleAddToCart } = useService();
  const {
    image_url,
    price,
    title,
    description,
    id,
    product_id,
    quantity,
    subTotal,
    category,
    category_id,
    publication_time,
    stock,
    user_id
  } = currentProduct;

  const addProductToCurrentCart = async () => {
    setLoading(true);
    await addProductToCart({
      image_url,
      price,
      title,
      description,
      id,
      product_id,
      quantity,
      subTotal,
      category,
      category_id,
      publication_time,
      stock,
      user_id
    });
    await handleAddToCart(
      {
        image_url,
        price,
        title,
        description,
        id,
        product_id,
        quantity,
        subTotal,
        category,
        category_id,
        publication_time,
        stock,
        user_id
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
          style={{width: '200px'}}
          alt={currentProduct.title}
        />
        <p>{currentProduct.description}</p>
        <p className='text-success2 product-price'>
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
          <BsCartPlus
            style={{ width: '50px', fontSize: '25px' }}
          />
          <small>Agregar</small>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductDetailModal;
