import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { ModalContext } from '../context/ModalContext';
import { MainContext } from '../context/MainContext';
import { BiDetail } from 'react-icons/bi';
import { BsCartPlus } from 'react-icons/bs';
import { PiShoppingCart } from 'react-icons/pi';
import useService from '../hooks/useService';
import '../index.css';

function ProductCard({
  image_url,
  price,
  title,
  description,
  id,
  product_id,
  quantity,
  subtotal,
  category,
  category_id,
  publication_time,
  stock,
  user_id
}) {
  const { handleAddToCart, handleGetCartItems } = useService();
  const { handleShowDetail, handleShowLogin } = useContext(ModalContext);
  const { token, user, loading, setLoading } = useContext(MainContext);
  const { setCurrentCart, getTotalPrice } = useContext(CartContext);

  const addProductToCurrentCart = async () => {
    setLoading(true);
    if (!token) {
      handleShowLogin();
      setLoading(false);
      return;
    }
    const product = {
      image_url,
      price,
      title,
      description,
      id,
      product_id,
      quantity,
      subtotal,
      category,
      category_id,
      publication_time,
      stock,
      user_id
    };
    await handleAddToCart(product, token, user.id);
    await fetchCart();
    setLoading(false);
  };

  const fetchCart = async () => {
    setLoading(true);
    try {
      if (user) {
        const cartItems = await handleGetCartItems(token, user.id);
        const cart = {
          products: cartItems,
          totalCart: getTotalPrice(cartItems)
        };
        setCurrentCart(cart);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  return (
    <Card className='card-custom'>
      <div
        className='display-flex justify-center align-items-center'
        style={{
          height: '100%',
          maxHeight: '50%',
          maxWidth: '100%',
          width: '100%',
          alignSelf: 'center',
          background: 'white',
          padding: '5px',
          borderRadius: '4px 4px 0 0'
        }}
      >
        <Card.Img variant='top' src={image_url} style={{maxHeight: '100%'}}/>
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className='card-text-custom'>{description}</Card.Text>
        <Card.Title className='text-success2'>
          ${price.toLocaleString('es-CL')}
        </Card.Title>
      </Card.Body>
      <Card.Footer className='card-body-footer'>
        <Button
          variant='outline-info'
          className='btn-xs'
          style={{ width: '110px' }}
          onClick={() => handleShowDetail(id, window.location.href)}
        >
          <BiDetail
            style={{
              width: 'fit-content',
              fontSize: '25px',
              paddingRight: '5px'
            }}
          />
          <small>Detalle</small>
        </Button>
        <Button
          variant='outline-warning'
          className='btn-xs'
          disabled={loading}
          style={{ width: '110px' }}
          onClick={() => {
            addProductToCurrentCart();
          }}
        >
          <BsCartPlus
            style={{
              width: 'fit-content',
              fontSize: '25px',
              paddingRight: '5px'
            }}
          />
          <small>Agregar</small>
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default ProductCard;
