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
    <div
      className='display-flex justify-center align-items-center'
      style={{ marginBottom: '2rem', flexWrap: 'wrap' }}
    >
      {categories.map((category) => {
        return (
          <div
            className='flex-column align-items-center justify-content-center'
            style={{
              margin: '1rem'
            }}
          >
            <img
              className='category-img'
              src={category.icon}
              onClick={() => showProductsByCategory(category.id)}
            />
            <small
              style={{
                fontSize: '12px',
                width: 'fit-content',
                color: 'white',
                marginTop: '5px'
              }}
            >
              {category.name}
            </small>
          </div>
        );
      })}
    </div>
  );
};

export default HeaderCategories;
