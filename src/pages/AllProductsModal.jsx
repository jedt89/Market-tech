import React, { useContext, useEffect } from 'react';
import { getAllProducts } from '../services/fetchProducts';
import ProductCard from '../components/ProductCard.jsx';
import { MainContext } from '../context/MainContext';
import { Modal } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import HeaderSearchBar from '../components/HeaderSearchBar.jsx';

const AllProductsModal = ({ showAllProducts, handleCloseAllProducts }) => {
  const { allProducts, setAllProducts, token } = useContext(MainContext);

  const fetchAllProducts = async (token) => {
    try {
      const products = await getAllProducts(token);
      if (products && products.length > 0) {
        setAllProducts(products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllProducts(token);
    }
  }, [token]);

  return (
    <Modal
      show={showAllProducts}
      onHide={handleCloseAllProducts}
      size='xl'
      backdrop='static'
    >
      <Modal.Header className='text-warning display-flex justify-between align-items-center'>
        <Modal.Title className='modal-title'>Todos los productos</Modal.Title>
        <HeaderSearchBar />
        <IoIosClose
          className='text-white'
          onClick={handleCloseAllProducts}
          style={{ cursor: 'pointer', fontSize: '26px' }}
        />
      </Modal.Header>
      <Modal.Body className='modal-body'>
        {allProducts &&
          allProducts.length > 0 &&
          allProducts.map((product) => {
            return <ProductCard {...product} />;
          })}
      </Modal.Body>
    </Modal>
  );
};

export default AllProductsModal;
