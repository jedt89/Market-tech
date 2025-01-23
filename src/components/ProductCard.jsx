import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function ProductCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>Tarjeta de video</Card.Title>
        <Card.Text>
          Esta es una tarjeta de video con la que usted podrá correr pacman
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Valor: muy caro</ListGroup.Item>
        <ListGroup.Item>Uso: poquito</ListGroup.Item>
        <ListGroup.Item>Tiene dinero: No</ListGroup.Item>
      </ListGroup>
      <Card.Body className='d-flex justify-content-between'>
        <Button variant="success">Comprar</Button>
        <Button variant="info">info</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;