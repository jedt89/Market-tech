import React, { useContext } from 'react';
import categories from '../models/categories.json';
import { MainContext } from '../context/MainContext';
import { ModalContext } from '../context/ModalContext';

const HeaderCategories = () => {
  const { showProductsByCategory } = useContext(MainContext);
  const { allProducts, handleShowAllProducts } = useContext(ModalContext);

  return (
    <div className='header-categories-container display-flex justify-center align-items-center'>
      {categories.map((category) => {
        return (
          <div className='header-categories-item flex-column align-items-center justify-content-center'>
            <img
              className='category-img'
              src={category.icon}
              onClick={() => {
                if (category.id == 11) {
                  handleShowAllProducts();
                  return;
                }
                showProductsByCategory(allProducts, category.id);
              }}
            />
            <small className='header-categories-img'>{category.name}</small>
          </div>
        );
      })}
    </div>
  );
};

export default HeaderCategories;
