import React, { useContext, useEffect } from 'react';
import { MainContext } from '../context/MainContext';
import HeaderCategories from '../components/HeaderCategories.jsx';
import ProductCard from './ProductCard.jsx';
import '../index.css';

const OurProducts = () => {
  const { productsByCategory, showProductsByCategory, user, allProducts } =
    useContext(MainContext);

  const init = () => {
    if (allProducts && allProducts.length > 0) {
      let products = allProducts;
      if (user && user.id) {
        products = allProducts.filter((product) => product.user_id !== user.id);
      }
      showProductsByCategory(products, 1);
    }
  };

  useEffect(() => {
    init();
  }, [allProducts]);

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
      <div className='d-flex justify-center align-items-center'>
        <div className='d-flex flex-wrap justify-center col-10 align-items-center product-list-container gap-2rem'>
          {!productsByCategory ||
            (productsByCategory && productsByCategory.length == 0 && (
              <h3 className='text-info'>No hay productos para mostrar</h3>
            ))}
          {productsByCategory &&
            productsByCategory.length > 0 &&
            productsByCategory.map((product) => (
              <div key={product.id}>
                <ProductCard {...product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OurProducts;
