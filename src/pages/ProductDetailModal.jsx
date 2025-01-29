import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext.jsx';
import { Modal } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function ProductDetailModal({ path }) {
  const { showDetail, handleCloseDetail, currentProduct } = useContext(MainContext);

  return (
    <Modal show={showDetail} onHide={() => handleCloseDetail(path)} centered backdrop="static">
      <Modal.Header className='text-warning display-flex justify-between align-items-center'>
        <Modal.Title className='modal-title'>{currentProduct.title}</Modal.Title>
        <IoIosClose
          className='text-white'
          onClick={() => handleCloseDetail(path)}
          style={{ cursor: 'pointer', fontSize: '26px' }}
        />
      </Modal.Header>
      <Modal.Body className='modal-body text-white text-center'>
        <img src={currentProduct.image_url} className='width-100-percent'/>
        <p>{currentProduct.description}</p>
        <p className='text-success' style={{fontSize: '2rem'}}>
          ${currentProduct.price && currentProduct.price.toLocaleString('es-CL')}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-secondary'
          onClick={() => handleCloseDetail(path)}
          className='modal-btn-cancel'
        >
          Volver
        </Button>
        <Button variant='outline-warning' className='modal-btn-submit'>
          Agregar al carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductDetailModal;
