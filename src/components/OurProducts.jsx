import React, { useContext } from 'react';
import HeaderCategories from '../components/HeaderCategories.jsx';
import { MainContext } from '../context/MainContext';
import ProductCard from './ProductCard.jsx';

const OurProducts = () => {
  const { productsToShow } = useContext(MainContext);

  return (
    <div className='our-products-container'>
      <h1 className='text-white'>Nuestros productos</h1>
      <HeaderCategories />
      <div className='d-flex justify-center align-items-center'>
        <div className='d-flex flex-wrap justify-center col-10 align-items-center' style={{ gap: '4rem', marginBottom: '2rem' }}>
          {productsToShow &&
            productsToShow.length > 0 &&
            productsToShow.map((product) => {
              return (
                <div key={product.id}>
                  <ProductCard {...product} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OurProducts;