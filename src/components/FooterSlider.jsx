import React, { useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import allProducts from '../models/allProducts.json';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { shuffleProducts } from '../hooks/UseMain';
import { ModalContext } from '../context/ModalContext';
import useService from '../hooks/useService';
import { CartContext } from '../context/CartContext';

function FooterSlider({ title }) {
  const { handleShowDetail } = useContext(ModalContext);
  const {handleAddToCart} = useService()
  const { currentCart, addProductToCart } = useContext(CartContext);
  const products = shuffleProducts(allProducts);
  const settings = {
    dots: false,
    infinite: false,
    class: 'center',
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='header-slider-container'>
      <h2 className='text-white'>{title}</h2>
      <div className='display-flex justify-center'>
        <div className='slider-container'>
          <Slider {...settings}>
            {products.map(({ image_url, title, price, id, description }) => {
              return (
                <Card className='card-custom-footer'>
                  <Card.Img variant='top' src={image_url} />
                  <Card.Body className='card-body-custom'>
                    <Card.Title className='card-title-custom'>
                      {title}
                    </Card.Title>
                    <Card.Title className='text-success'>
                      ${price.toLocaleString('es-CL')}
                    </Card.Title>
                  </Card.Body>
                  <Card.Body className='card-body-footer'>
                    <Button
                      variant='outline-info'
                      className='btn-xs'
                      onClick={() => handleShowDetail(id, window.location.href)}
                    >
                      Detalle
                    </Button>
                    <Button
                      variant='outline-warning'
                      className='btn-xs'
                      onClick={() => {
                        addProductToCart({
                          image_url,
                          price,
                          title,
                          description,
                          id
                        });
                        handleAddToCart(currentCart, token);
                      }}
                    >
                      Agregar al carrito
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default FooterSlider;
