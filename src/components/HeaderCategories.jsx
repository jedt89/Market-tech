import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext';
import { ModalContext } from '../context/ModalContext';
import categories from '../models/categories.json';
import '../index.css';

const HeaderCategories = ({ products }) => {
  const { showProductsByCategory } = useContext(MainContext);
  const { handleShowAllProducts } = useContext(ModalContext);

  return (
    <div className='header-categories-container display-flex justify-center align-items-center'>
      {categories.map((category) => (
        <div
          className='header-categories-item flex-column align-items-center justify-content-center'
          key={category.id}
        >
          <img
            className='category-img'
            src={category.icon}
            onClick={() => {
              if (category.id === 11) {
                handleShowAllProducts();
                return;
              }
              showProductsByCategory(products, category.id);
            }}
            alt={category.name}
          />
          <small className='header-categories-img'>{category.name}</small>
        </div>
      ))}
    </div>
  );
};

export default HeaderCategories;
