import React, { useContext, useEffect, useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { TfiSave } from 'react-icons/tfi';
import { CiCircleInfo } from 'react-icons/ci';
import useInput from '../hooks/useInput';
import { MainContext } from '../context/MainContext';
import useService from '../hooks/useService'; // Ensure this path is correct
import categories from '../models/categories.json';
import '../index.css';

const ManagementSections = ({ products, transactions }) => {
  const { handleAddProduct, handleGetProducts } = useService();
  const { token, user } = useContext(MainContext);
  const [showTab, setShowTab] = useState(0);
  const [transactionsToShow, setTransactionsToShow] = useState([]);
  const [productList, setProductList] = useState(products);
  const productName = useInput('');
  const productId = useInput('');
  const imageUrl = useInput('');
  const productDescription = useInput('');
  const categoryId = useInput('');
  const price = useInput('');
  const stock = useInput('');

  const filterTransactions = (buy) => {
    // const transactionsToShow = transactions.filter((transaction) =>
    //   buy ? transaction.id < 5 : transaction.id > 5
    // );
    const transactionsToShow = transactions;
    setTransactionsToShow(transactionsToShow);
  };

  const clearForm = () => {
    productName.setValue('');
    productId.setValue('');
    imageUrl.setValue('');
    productDescription.setValue('');
    categoryId.setValue('');
    price.setValue('');
    stock.setValue('');
  };

  const refreshProducts = async () => {
    const products = await handleGetProducts(user.id);
    setProductList(products);
  };

  useEffect(() => {
    filterTransactions(true);
  }, [transactions]);

  return (
    <div className='width-100-percent'>
      <Nav
        variant='pills'
        activeKey={showTab}
        onSelect={(eventKey) => setShowTab(eventKey)}
        className='width-100-percent display-flex justify-center nav-padding-bottom'
      >
        <Nav.Item>
          <Nav.Link eventKey='0'>Agregar un producto</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='1'>Mis productos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='2'>Historial de transacciones</Nav.Link>
        </Nav.Item>
      </Nav>

      {showTab == 0 && (
        <div className='width-100-percent flex-column align-items-center'>
          <div className='border-radius-8 form-container'>
            <div className='form-group'>
              <label htmlFor='productName' className='form-label'>
                Nombre de producto
              </label>
              <input
                type='text'
                className='form-control'
                value={productName.value}
                placeholder='Introduce el nombre de producto'
                onChange={(event) => {
                  productName.onChange(event);
                }}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='productDescription' className='form-label'>
                Descripción del producto
              </label>
              <input
                type='text'
                className='form-control'
                value={productDescription.value}
                placeholder='Introduce la descripción del producto'
                onChange={(event) => {
                  productDescription.onChange(event);
                }}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='categoryId' className='form-label'>
                ID de categoria
              </label>
              <select
                className='form-control'
                value={categoryId.value}
                onChange={(event) => {
                  categoryId.onChange(event);
                }}
              >
                <option value=''>Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='imageUrl' className='form-label'>
                Url de imagen
              </label>
              <input
                type='text'
                className='form-control'
                value={imageUrl.value}
                placeholder='Introduce la url de la imagen'
                onChange={(event) => {
                  imageUrl.onChange(event);
                }}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='price' className='form-label'>
                Precio
              </label>
              <input
                type='text'
                className='form-control'
                value={price.value}
                placeholder='Introduce el precio'
                onChange={(event) => {
                  price.onChange(event);
                }}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='stock' className='form-label'>
                Stock
              </label>
              <input
                type='text'
                className='form-control'
                value={stock.value}
                placeholder='Introduce el stock'
                onChange={(event) => {
                  stock.onChange(event);
                }}
              />
            </div>
            <div className='display-flex justify-end form-button-container'>
              <Button
                className='save-button'
                variant='success'
                onClick={() => {
                  const product = {
                    productName: productName.value,
                    imageUrl: imageUrl.value,
                    productDescription: productDescription.value,
                    categoryId: categoryId.value,
                    price: price.value,
                    stock: stock.value
                  };
                  handleAddProduct(product, token);
                  clearForm();
                  refreshProducts();
                }}
              >
                <TfiSave className='save-icon' />
                Guardar producto
              </Button>
            </div>
          </div>
        </div>
      )}

      {showTab == 1 && (
        <div className='flex-column border-radius-8 width-100-percent gap-1rem align-items-center'>
          <div className='width-100-percent table-products border-radius-8 all-text-white table-header'>
            <div>Id</div>
            <div>Nombre</div>
            <div>Descripción</div>
            <div>Id de categoría</div>
            <div>Url de imagen</div>
            <div>Precio</div>
            <div>Stock</div>
          </div>
          <div className='border-radius-8 all-text-white table-body'>
            {productList &&
              productList.length > 0 &&
              productList.map(
                ({
                  id,
                  title,
                  description,
                  category,
                  image_url,
                  price,
                  stock
                }) => (
                  <div
                    className='width-100-percent table-products table-row'
                    key={id}
                  >
                    <div>{id}</div>
                    <div>{title}</div>
                    <div>{description}</div>
                    <div>{category}</div>
                    <div>{image_url}</div>
                    <div>{price}</div>
                    <div>{stock}</div>
                  </div>
                )
              )}
          </div>
        </div>
      )}

      {showTab == 2 && (
        <div className='flex-column border-radius-8 width-100-percent gap-1rem align-items-center'>
          <div className='display-flex align-items-center justify-center gap-2rem'>
            <Button
              variant='outline-warning'
              className='btn-xs'
              onClick={() => filterTransactions(true)}
            >
              Compras
            </Button>
            <Button
              variant='outline-warning'
              className='btn-xs'
              onClick={() => filterTransactions(false)}
            >
              Ventas
            </Button>
          </div>
          <div className='border-radius-8 all-text-white width-100-percent'>
            {transactionsToShow &&
              transactionsToShow.length > 0 &&
              transactionsToShow.map(
                ({
                  id,
                  title,
                  description,
                  category,
                  image_url,
                  price,
                  stock
                }) => (
                  <div
                    className='display-flex gap-1rem align-items-center border-radius-8 transaction-item border-yellow'
                    key={id}
                  >
                    <img
                      src={image_url}
                      className='transaction-image'
                      alt={title}
                    />
                    <div>
                      <p>ID: {id}</p>
                      <p>Nombre: {title}</p>
                      <p>Descripción: {description}</p>
                      <p>Categoría: {category}</p>
                      <p>Precio: ${price}</p>
                      <p>Cantidad: {stock}</p>
                    </div>
                    <Button variant='outline-info' className='d-flex gap-1rem'>
                      <CiCircleInfo className='text-info' />
                      <span>Ver detalle</span>
                    </Button>
                  </div>
                )
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementSections;
