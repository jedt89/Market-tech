import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function ProductCard({ image_url, price, title }) {
  console.log(image_url);
  return (
    <Card
      style={{
        backgroundColor: '#201f32',
        color: 'white',
        padding: '5px',
        maxWidth: '300px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        height: '550px',
        minHeight: '550px',
      }}
    >
      <Card.Img variant='top' src={image_url} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text style={{ fontSize: '12px' }}>
          Esta es una tarjeta de video con la que usted podrá correr pacman
        </Card.Text>
        <Card.Title>${price.toLocaleString('es-CL')}</Card.Title>
      </Card.Body>
      <Card.Body className='d-flex justify-content-between' style={{ maxHeight: '70px', height: '70px' }}>
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
