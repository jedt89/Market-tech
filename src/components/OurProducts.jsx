import React, { useContext, useEffect } from 'react';
import HeaderCategories from '../components/HeaderCategories.jsx';
import { MainContext } from '../context/MainContext';
import ProductCard from './ProductCard.jsx';
import { getAllProducts } from '../services/fetchProducts.js';
import { ModalContext } from '../context/ModalContext.jsx';
import '../index.css';

const OurProducts = () => {
  const { productsByCategory, showProductsByCategory } =
    useContext(MainContext);
  const { setAllProducts } = useContext(ModalContext);

  const fetchAllProducts = async (token) => {
    try {
      const products = await getAllProducts(token);
      if (products && products.length > 0) {
        setAllProducts(products);
        showProductsByCategory(products, 1);

      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    console.log('productsbycategory', productsByCategory)

  }, []);

  return (
    <div className='our-products-container'>
      <h1 className='text-white'>Nuestros productos</h1>
      <HeaderCategories />
      <div className='d-flex justify-center align-items-center'>
        <div className='d-flex flex-wrap justify-center col-10 align-items-center product-list-container gap-2rem'>
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