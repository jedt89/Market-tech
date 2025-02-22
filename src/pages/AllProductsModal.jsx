import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../context/MainContext';
import { Modal } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { LuSearchX } from 'react-icons/lu';
import { ModalContext } from '../context/ModalContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import HeaderSearchBar from '../components/HeaderSearchBar.jsx';
import '../index.css';

const AllProductsModal = () => {
  const [productsFiltered, setProductsFiltered] = useState([]);
  const { textSearched, user, allProducts } = useContext(MainContext);
  const { showAllProducts, handleCloseAllProducts } = useContext(ModalContext);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const filteredProducts = allProducts.filter((product) => {
        if (user && user.id) {
          return (
            product.title.toLowerCase().includes(textSearched.toLowerCase()) &&
            product.user_id !== user.id
          );
        }
        return product.title.toLowerCase().includes(textSearched.toLowerCase());
      });
      setProductsFiltered(filteredProducts);
    }
  }, [textSearched]);

  return (
    <Modal
      show={showAllProducts}
      onHide={handleCloseAllProducts}
      size='xl'
      backdrop='static'
    >
      <Modal.Header className='text-warning flex-column'>
        <div className='display-flex justify-between align-items-center width-100-percent pb-3'>
          <Modal.Title className='modal-title'>Todos los productos</Modal.Title>
          <IoIosClose
            className='text-white close-icon'
            onClick={handleCloseAllProducts}
          />
        </div>
        <HeaderSearchBar className='width-100-percent' />
      </Modal.Header>
      <Modal.Body className='modal-body'>
        {!productsFiltered ||
          (productsFiltered && productsFiltered.length == 0 && (
            <div className='display-flex align-items-center gap-1rem'>
              <LuSearchX
                className='text-warning'
                style={{ fontSize: '30px' }}
              />
              <h3 className='text-info padding0'>
                No se han encontrado resultados
              </h3>
            </div>
          ))}
        {productsFiltered &&
          productsFiltered.length > 0 &&
          productsFiltered.map((product) => {
            if (!user || (user && product.user_id !== user.id)) {
              return (
                <div key={product.id}>
                  <ProductCard {...product} />
                </div>
              );
            }
            return null;
          })}
      </Modal.Body>
    </Modal>
  );
};

export default AllProductsModal;
