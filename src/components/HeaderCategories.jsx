import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from '../context/MainContext';
import { ModalContext } from '../context/ModalContext';
import { categoryIcons } from '../assets';
import categories from '../models/categories.json';
import '../index.css';

const HeaderCategories = ({ products }) => {
  const { showProductsByCategory, setCategorySelected } = useContext(MainContext);
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
            src={categoryIcons[category.id]}
            alt={category.name}
            onClick={() => {
              if (category.id === 11) {
                handleShowAllProducts();
                return;
              }
              setCategorySelected(category.id);
            }}
          />
          <small className='header-categories-img'>{category.name}</small>
        </div>
      ))}
    </div>
  );
};

export default HeaderCategories;
