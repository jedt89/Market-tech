import React, { useContext, useEffect, useState } from 'react';
import { getAllProducts } from '../services/fetchProducts';
import ProductCard from '../components/ProductCard.jsx';
import { MainContext } from '../context/MainContext';
import { Modal } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import HeaderSearchBar from '../components/HeaderSearchBar.jsx';
import { ModalContext } from '../context/ModalContext.jsx';

const AllProductsModal = () => {
  const [productsFiltered, setProductsFiltered] = useState([]);
  const { token, textSearched } = useContext(MainContext);
  const {
    showAllProducts,
    handleCloseAllProducts,
    allProducts,
    setAllProducts
  } = useContext(ModalContext);

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

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const productsFiltered = allProducts.filter((product) =>
        product.title.includes(textSearched)
      );
      setProductsFiltered(productsFiltered);
    }
  }, [textSearched]);

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
          style={{ cursor: 'pointer', fontSize: '30px' }}
        />
      </Modal.Header>
      <Modal.Body className='modal-body'>
        {productsFiltered &&
          productsFiltered.length > 0 &&
          productsFiltered.map((product) => {
            return <ProductCard {...product} />;
          })}
      </Modal.Body>
    </Modal>
  );
};

export default AllProductsModal;
