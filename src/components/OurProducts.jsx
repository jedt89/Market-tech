import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext';
import HeaderCategories from '../components/HeaderCategories.jsx';
import ProductCard from './ProductCard.jsx';
import '../index.css';

const OurProducts = () => {
  const { user, allProducts, categorySelected } = useContext(MainContext);

  return (
    <div className='our-products-container'>
      <h1 className='text-white'>Nuestros productos</h1>
      {allProducts && allProducts.length > 0 && (
        <HeaderCategories
          products={allProducts.filter((product) => {
            if (user && user.id) {
              return product.user_id != user.id;
            }
            return product;
          })}
        />
      )}
      <div className='d-flex justify-center align-items-center '>
        <div className='d-flex flex-wrap justify-center flex-wrap align-items-center product-list-container gap-2rem'>
          {!allProducts ||
            (allProducts && allProducts.length == 0 && (
              <h3 className='text-info'>No hay productos para mostrar</h3>
            ))}
          {allProducts &&
            allProducts.length > 0 &&
            allProducts.map((product) => {
              if ((!user || (user && product.user_id !== user.id)) && (categorySelected == product.category_id)) {
                return (
                  <div key={product.id}>
                    <ProductCard key={product.id} {...product} />
                  </div>
                );
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
};

export default OurProducts;
