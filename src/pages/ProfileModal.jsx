import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { MainContext } from '../context/MainContext';
import { handleGetProducts } from '../hooks/useService';
import { VscCircleLargeFilled } from 'react-icons/vsc';
import { MdAccessTime } from 'react-icons/md';
import { AiOutlineProduct } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';
import useInput from '../hooks/useInput';

const ProfileModal = ({ showProfile, handleCloseProfile }) => {
  const { token, user } = useContext(MainContext);
  const [products, setProducts] = useState([]);
  const [showProductsTable, setShowProductsTable] = useState(false);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const productName = useInput('');
  const productId = useInput('');
  const imageUrl = useInput('');

  const fetchProducts = async (user) => {
    try {
      const products = await handleGetProducts(user.id);
      setProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProducts(user);
    }
  }, [token]);

  return (
    <Modal
      show={showProfile}
      onHide={handleCloseProfile}
      centered
      fullscreen
      backdrop='static'
    >
      <Modal.Header className='text-warning display-flex justify-between align-items-center'>
        <Modal.Title className='modal-title'>Mi perfil</Modal.Title>
        <div className='display-flex justify-end gap-1rem align-items-center'>
          <div className='display-flex gap-1rem'>
            <Button
              style={{
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                height: '40px'
              }}
              variant='outline-warning'
              size='sm'
              onClick={() => setShowNewProductForm(!showNewProductForm)}
            >
              <FiPlus
                color='#fab005'
                style={{ fontSize: '20px', marginRight: '5px' }}
              />
              Agregar nuevo producto
            </Button>

            <Button
              style={{
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                height: '40px'
              }}
              variant='outline-warning'
              size='sm'
              onClick={() => setShowProductsTable(!showProductsTable)}
            >
              <AiOutlineProduct
                color='#fab005'
                style={{ fontSize: '20px', marginRight: '5px' }}
              />
              Mostrar productos
            </Button>
          </div>
          <IoIosClose
            className='text-white'
            onClick={() => {
              handleCloseProfile(user.id);
            }}
            style={{ cursor: 'pointer', fontSize: '26px' }}
          />
        </div>
      </Modal.Header>
      <Modal.Body className='text-white'>
        <div
          className='width-100-percent'
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            height: 'fit-content'
          }}
        >
          <div></div>
          <div
            className='flex-column border-yellow border-radius-8 text-center gap-1rem'
            style={{ padding: '1rem' }}
          >
            <div className='display-flex align-items-center gap-2rem text-center justify-center'>
              <img
                style={{
                  borderRadius: '50%',
                  width: '150px',
                  height: '150px',
                  border: '1px solid white'
                }}
                src='../src/assets/img/profile-2.png'
                alt=''
              />
              <p className='text-warning' style={{ fontSize: '30px' }}>
                Julio Jaramillo
              </p>
            </div>
            <div style={{ fontStyle: 'italic' }}>
              Vendedor especializado en hardware y refrigeración líquida.
            </div>
            <div className='display-flex justify-center align-items-center text-center gap-1rem'>
              <MdAccessTime color='blue' />
              Tiempo de actividad: 16 hrs, 32 minutos
            </div>
            <div className='display-flex justify-center align-items-center text-center gap-1rem'>
              <VscCircleLargeFilled color='yellowgreen' />
              Activo
            </div>
          </div>
        </div>
        {showNewProductForm && (
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <div className='form-group'>
              <label htmlFor='productName' className='form-label'>
                Nombre de producto
              </label>
              <input
                type='text'
                className='form-control'
                id='productName'
                value={productName.value}
                placeholder='Introduce el nombre de producto'
                onChange={(event) => {
                  productName.onChange(event);
                }}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='productId' className='form-label'>
                Id de producto
              </label>
              <input
                type='text'
                className='form-control'
                id='productId'
                value={productId.value}
                placeholder='Introduce el ID de producto'
                onChange={(event) => {
                  productId.onChange(event);
                }}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='imageUrl' className='form-label'>
                Url de imagen
              </label>
              <input
                type='imageUrl'
                className='form-control'
                id='imageUrl'
                value={imageUrl.value}
                placeholder='Introduce la url de la imagen'
                onChange={(event) => {
                  imageUrl.onChange(event);
                }}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='productName' className='form-label'>
                Nombre de producto
              </label>
              <input
                type='text'
                className='form-control'
                id='productName'
                value={productName.value}
                placeholder='Introduce el nombre de producto'
                onChange={(event) => {
                  productName.onChange(event);
                }}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='productId' className='form-label'>
                Id de producto
              </label>
              <input
                type='text'
                className='form-control'
                id='productId'
                value={productId.value}
                placeholder='Introduce el ID de producto'
                onChange={(event) => {
                  productId.onChange(event);
                }}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='imageUrl' className='form-label'>
                Url de imagen
              </label>
              <input
                type='imageUrl'
                className='form-control'
                id='imageUrl'
                value={imageUrl.value}
                placeholder='Introduce la url de la imagen'
                onChange={(event) => {
                  imageUrl.onChange(event);
                }}
              />
            </div>

            <div className='display-flex justify-end' style={{ padding: '1rem' }}>
              <Button
                style={{
                  width: 'fit-content',
                  display: 'flex',
                  alignItems: 'center',
                  height: '40px'
                }}
                variant='outline-warning'
                onClick={() => {
                  console.log('!!!!!!! nuevo producto');
                }}
              >
                <FiPlus
                  color='#fab005'
                  style={{ fontSize: '30px', marginRight: '5px' }}
                />
                Agregar nuevo producto
              </Button>
            </div>
          </div>
        )}
        {showProductsTable && (
          <div
            className='flex-column border-radius-8 width-100-percent gap-1rem'
            style={{ border: '1px solid #fab005', padding: '1rem' }}
          >
            <div
              className='width-100-percent table-products border-radius-8'
              style={{
                display: 'grid',
                gridTemplateColumns: '50px 1fr 1fr 100px 1fr 100px 100px',
                padding: '1rem 0rem',
                backgroundColor: '#38364b'
              }}
            >
              <div>Id</div>
              <div>Nombre</div>
              <div>Descripción</div>
              <div>Id de categoría</div>
              <div>Url de imagen</div>
              <div>Precio</div>
              <div>Stock</div>
            </div>
            <div
              className='border-radius-8'
              style={{ backgroundColor: '#38364b', paddingTop: '.5rem' }}
            >
              {products.map(
                ({ id, title, description, category_id, image_url, price }) => {
                  return (
                    <div
                      className='width-100-percent table-products'
                      style={{
                        display: 'grid',
                        gridTemplateColumns:
                          '50px 1fr 1fr 100px 1fr 100px 100px'
                      }}
                    >
                      <div>{id}</div>
                      <div>{title}</div>
                      <div>{description}</div>
                      <div>{category_id}</div>
                      <div>{image_url}</div>
                      <div>{price}</div>
                      <div>{500}</div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-warning'
          onClick={handleCloseProfile}
          className='modal-btn-cancel'
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
