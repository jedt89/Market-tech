import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { MainContext } from '../context/MainContext';
import { useContext } from 'react';

function ProductCard({ image_url, price, title, description, id }) {
  const { handleShowDetail } = useContext(MainContext);

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
        <Button variant='outline-warning' className='btn-xs'>
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
