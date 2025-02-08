import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { ModalContext } from '../context/ModalContext';
import { MainContext } from '../context/MainContext';
import useService from '../hooks/useService';
import '../index.css';

function ProductCard({
  image_url,
  price,
  title,
  description,
  id,
  quantity,
  subTotal
}) {
  const { handleAddToCart } = useService();
  const { handleShowDetail, handleShowLogin } = useContext(ModalContext);
  const { token, user } = useContext(MainContext);
  const { currentCart, addProductToCart } = useContext(CartContext);

  const getCartItem = (id) => {
    const item = currentCart.products.find((product) => product.id === id);
    if (item) {
      return item;
    }
  };

  return (
    <Card className='card-custom'>
      <Card.Img variant='top' src={image_url} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className='card-text-custom'>{description}</Card.Text>
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
            if (!token) {
              handleShowLogin();
              return;
            }
            addProductToCart({
              image_url,
              price,
              title,
              description,
              id,
              quantity,
              subTotal
            });
            handleAddToCart(getCartItem(id), token, user.id);
          }}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
