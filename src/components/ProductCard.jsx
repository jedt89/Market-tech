import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ModalContext } from '../context/ModalContext';
import { MainContext } from '../context/MainContext';
import useService from '../hooks/useService';

function ProductCard({ image_url, price, title, description, id }) {
  const { handleAddToCart } = useService();
  const { handleShowDetail, handleshowlogin } = useContext(ModalContext);
  const { token } = useContext(MainContext);
  const { currentCart, addProductToCart } = useContext(CartContext);

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
              handleshowlogin();
              return;
            }
            addProductToCart({ image_url, price, title, description, id });
            handleAddToCart(currentCart, token);
          }}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
