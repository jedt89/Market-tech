import React, { useState, useContext } from 'react';
import allProducts from '../models/allProducts.json';
import categories from '../models/categories.json';
import { MainContext } from '../context/MainContext';

const HeaderCategories = () => {
  const { setProductsToShow } = useContext(MainContext);

  const showProductsByCategory = (id) => {
    const products = allProducts.filter(
      (product) => product.category_id === id
    );
    setProductsToShow(products);
  };

  return (
    <div className='header-categories-container display-flex justify-center align-items-center'>
      {categories.map((category) => {
        return (
          <div className='header-categories-item flex-column align-items-center justify-content-center'>
            <img
              className='category-img'
              src={category.icon}
              onClick={() => showProductsByCategory(category.id)}
            />
            <small className='header-categories-img'>
              {category.name}
            </small>
          </div>
        );
      })}
    </div>
  );
};

export default HeaderCategories;