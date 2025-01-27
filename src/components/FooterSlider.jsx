import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from './ProductCard.jsx';
import allProducts from '../models/allProducts.json';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { shuffleProducts } from '../hooks/UseMain';

function FooterSlider({ title }) {
  const products = shuffleProducts(allProducts);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
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
    <div style={{ marginBottom: '2rem', padding: '1rem 0rem' }}>
      <h2 className='text-white'>{title}</h2>
      <div className='display-flex justify-center'>
        <div className='slider-container' style={{ width: '80%' }}>
          <Slider {...settings}>
            {products.map((product) => {
              return (
                <Card
                  style={{
                    backgroundColor: '#201f32',
                    color: 'white',
                    padding: '5px',
                    maxWidth: '300px',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                  }}
                >
                  <Card.Img variant='top' src={product.image_url} />
                  <Card.Body style={{ height: '90px' }}>
                    <Card.Title
                      style={{ fontSize: '1rem', textAlign: 'center' }}
                    >
                      {product.title}
                    </Card.Title>
                    <Card.Title>
                      ${product.price.toLocaleString('es-CL')}
                    </Card.Title>
                  </Card.Body>
                  <Card.Body
                    className='d-flex justify-content-between'
                    style={{ maxHeight: '70px', height: '70px' }}
                  >
                    <Button variant='outline-info' className='btn-xs'>
                      Detalle
                    </Button>
                    <Button variant='outline-warning' className='btn-xs'>
                      Comprar
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
