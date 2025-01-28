import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function ProductCard({ image_url, price, title }) {
  return (
    <Card className='card-custom'>
      <Card.Img variant='top' src={image_url} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className='card-text-custom'>
          Esta es una tarjeta de video con la que usted podrá correr pacman
        </Card.Text>
        <Card.Title>${price.toLocaleString('es-CL')}</Card.Title>
      </Card.Body>
      <Card.Body className='card-body-footer'>
        <Button variant='outline-info' className='btn-xs'>
          Detalle
        </Button>
        <Button variant='outline-warning' className='btn-xs'>
          Comprar
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;