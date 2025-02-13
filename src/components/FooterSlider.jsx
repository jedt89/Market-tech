import React, { useContext, useState, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';
import { CartContext } from '../context/CartContext';
import { MainContext } from '../context/MainContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import useService from '../hooks/useService';

function FooterSlider({ title }) {
  const { handleShowDetail } = useContext(ModalContext);
  const { token, user, allProducts, loading, setLoading } =
    useContext(MainContext);
  const { handleAddToCart } = useService();
  const { addProductToCart } = useContext(CartContext);
  const [products, setProducts] = useState(allProducts);

  const settings = {
    dots: false,
    infinite: false,
    class: 'center',
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true
  };

  const init = () => {
    if (allProducts && allProducts.length > 0) {
      let products = allProducts;
      if (user && user.id) {
        products = allProducts.filter((product) => {
          return product.user_id != user.id;
        });
      }
      setProducts(products);
    }
  };

  const addProductToCurrentCart = async (
    image_url,
    title,
    price,
    id,
    quantity,
    subTotal,
    description
  ) => {
    setLoading(true);
    await addProductToCart({
      image_url,
      price,
      title,
      description,
      id,
      quantity,
      subTotal
    });
    await handleAddToCart(
      {
        image_url,
        price,
        title,
        description,
        id,
        quantity,
        subTotal
      },
      token,
      user.id
    );
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, [allProducts]);

  return (
    <div className='header-slider-container'>
      <h2 className='text-white'>{title}</h2>
      <div className='display-flex justify-center'>
        <div className='slider-container'>
          <Slider {...settings}>
            {!products ||
              (products && products.length == 0 && (
                <h3 className='text-info'>No hay productos para mostrar</h3>
              ))}
            {products &&
              products.length > 0 &&
              products.map(
                ({
                  image_url,
                  title,
                  price,
                  id,
                  quantity,
                  subTotal,
                  description
                }) => (
                  <Card className='card-custom-footer' key={id}>
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
                        onClick={() =>
                          handleShowDetail(id, window.location.href)
                        }
                      >
                        Detalle
                      </Button>
                      <Button
                        variant='outline-warning'
                        className='btn-xs'
                        disabled={loading}
                        onClick={() => {
                          addProductToCurrentCart(
                            image_url,
                            title,
                            price,
                            id,
                            quantity,
                            subTotal,
                            description
                          );
                        }}
                      >
                        Agregar al carrito
                      </Button>
                    </Card.Body>
                  </Card>
                )
              )}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default FooterSlider;
