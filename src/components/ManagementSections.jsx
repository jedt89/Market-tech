import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { TfiSave } from 'react-icons/tfi';
import { CiCircleInfo } from 'react-icons/ci';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoMdCloudUpload } from 'react-icons/io';
import { MainContext } from '../context/MainContext';
import { ModalContext } from '../context/ModalContext';
import { CartContext } from '../context/CartContext';
import useInput from '../hooks/useInput';
import useService from '../hooks/useService';
import useMain from '../hooks/useMain';
import categories from '../models/categories.json';
import '../index.css';

const ManagementSections = () => {
  const { getDate } = useMain();
  const {
    handleAddProduct,
    handleDeleteProduct,
    handleUploadFile,
    handleGetTransactionDetail,
    handleGetProducts
  } = useService();
  const {
    token,
    user,
    setLoading,
    allProducts,
    setAllProducts,
    setCurrentTransaction,
    transactions
  } = useContext(MainContext);
  const { getTotalPrice } = useContext(CartContext);
  const { handleShowTransaction } = useContext(ModalContext);
  const [showTab, setShowTab] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [transactionsToShow, setTransactionsToShow] = useState([]);
  const inputLoadFile = useRef(null);
  const productName = useInput('');
  const productId = useInput('');
  const imageUrl = useInput('');
  const productDescription = useInput('');
  const categoryId = useInput('');
  const price = useInput('');
  const stock = useInput('');

  const filterTransactions = (buy) => {
    const transactionsToShow = buy
      ? transactions.purchases
      : transactions.sales;
    setTransactionsToShow(transactionsToShow);
  };

  const getTransaction = async (token, transactionId) => {
    setLoading(true);
    const transaction = await handleGetTransactionDetail(token, transactionId);
    return transaction;
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

  const addProductManaged = async (product, token) => {
    setLoading(true);
    await handleAddProduct(product, token);
    await clearForm();
    await refreshProducts();
    setLoading(false);
  };

  const refreshProducts = async () => {
    const products = await handleGetProducts();
    if (products && products.length > 0) {
      setAllProducts(products);
    }
    return products;
  };

  const deleteProductManaged = async (product_id, token) => {
    await handleDeleteProduct(product_id, token);
    await refreshProducts();
  };

  const uploadFile = async (token) => {
    const input = inputLoadFile.current;
    const file = input.files[0];
    const formData = new FormData();
    formData.append('image', file);
    const response = await handleUploadFile(token, formData);
    imageUrl.setValue(response.url || '../src/assets/img/nvidia-4060.png');
  };

  const checkFormValid = () => {
    const isValid = !!(
      productName.value &&
      productDescription.value &&
      categoryId.value &&
      price.value > 0 &&
      stock.value > 0 &&
      imageUrl.value
    );
    setIsFormValid(isValid);
  };

  useEffect(() => {
    filterTransactions(true);
  }, [transactions]);

  useEffect(() => {
    checkFormValid();
  }, [productName, productDescription, categoryId, price, stock, imageUrl]);

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
          <Nav.Link eventKey='2'>Transacciones</Nav.Link>
        </Nav.Item>
      </Nav>

      {showTab == 0 && (
        <div className='width-100-percent flex-column align-items-center'>
          <div className='form-container'>
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
                ID de categoría
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
              <label htmlFor='price' className='form-label'>
                Precio
              </label>
              <input
                type='number'
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
                type='number'
                className='form-control'
                value={stock.value}
                placeholder='Introduce el stock'
                onChange={(event) => {
                  stock.onChange(event);
                }}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='imageUrl' className='form-label'>
                Seleccionar imagen
              </label>
              <form id='uploadForm' encType='multipart/form-data'>
                <input
                  type='file'
                  name='file'
                  ref={inputLoadFile}
                  id='file'
                  className='border-radius-8 width-100-percent mb-2'
                />
                {inputLoadFile &&
                  inputLoadFile.current &&
                  inputLoadFile.current.files &&
                  inputLoadFile.current.files[0] && (
                    <img
                      src={URL.createObjectURL(inputLoadFile.current.files[0])}
                      alt='Selected file'
                      style={{ width: '50px', alignSelf: 'center' }}
                    />
                  )}
                <Button
                  variant='success'
                  className='display-flex align-items-center gap-1rem'
                  onClick={() => {
                    uploadFile(token);
                  }}
                >
                  <IoMdCloudUpload className='me-3' />
                  Subir Imagen
                </Button>
              </form>
            </div>
            <div className='display-flex justify-center form-button-container'>
              <Button
                className='save-button'
                variant='success'
                disabled={!isFormValid}
                onClick={() => {
                  const product = {
                    productName: productName.value,
                    imageUrl: imageUrl.value,
                    productDescription: productDescription.value,
                    categoryId: categoryId.value,
                    price: price.value,
                    stock: stock.value
                  };
                  addProductManaged(product, token);
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
        <div className='border-radius-8 width-100-percent overflow-auto max-height-30vh'>
          {allProducts &&
            allProducts.length > 0 &&
            allProducts.map(
              ({
                id,
                title,
                description,
                category_id,
                price,
                stock,
                product_id,
                user_id,
                category,
                image_url
              }) => {
                if (user && user_id === user.id) {
                  return (
                    <div className='product-row mb-3' key={id}>
                      <div className='display-flex align-items-center gap-1rem'>
                        <img
                          src={image_url}
                          style={{ width: '60px', borderRadius: '6px' }}
                          alt={title}
                        />
                        <div className='product-row-title'>
                          <div>
                            <p>Id de producto:</p> {id}
                          </div>
                          <div>
                            <p>Nombre de producto:</p> {title}
                          </div>
                          <div>
                            <p>Descripción:</p> {description}
                          </div>
                          <div>
                            <p>Categoría:</p> {category}
                          </div>
                          <div>
                            <p>Id de Categoría:</p> {category_id}
                          </div>
                          <div>
                            <p>Precio:</p> {price}
                          </div>
                        </div>
                      </div>

                      <div className='flex-column justify-center align-items-center gap-1rem'>
                        <div>
                          <b className='text-success2'>Stock:</b> {stock}
                        </div>
                        <FaRegTrashAlt
                          className='cursor-pointer text-danger'
                          onClick={() =>
                            deleteProductManaged(product_id, token)
                          }
                        />
                      </div>
                    </div>
                  );
                }
              }
            )}
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
            {transactionsToShow && transactionsToShow.length == 0 && (
              <div className='display-flex justify-center'>
                No hay transacciones para mostrar
              </div>
            )}

            <div className='border-radius-8 width-100-percent overflow-auto padding0 max-height-30vh'>
              {transactionsToShow &&
                transactionsToShow.length > 0 &&
                transactionsToShow.map(
                  ({
                    transaction_id,
                    buyer_name,
                    date,
                    total_price,
                    product_name,
                    state
                  }) => (
                    <div key={transaction_id} className='product-row mb-3'>
                      <div className='product-row-title'>
                        <div>
                          <p>ID de transacción:</p> {transaction_id}
                        </div>
                        <div>
                          <p>Fecha de transacción:</p> {getDate(date)}
                        </div>
                        {state && (
                          <div>
                            <p>Estado:</p> {state}
                          </div>
                        )}
                        {!total_price && (
                          <div>
                            <p>Comprador:</p> {buyer_name}
                          </div>
                        )}
                        {product_name && (
                          <div>
                            <p>Nombre de producto:</p> {product_name}
                          </div>
                        )}

                        <div>
                          <p>Total compra:</p> $
                          {Math.trunc(
                            total_price
                              ? total_price
                              : getTotalPrice(transactionsToShow)
                          ).toLocaleString('es-CL')}
                        </div>
                      </div>
                      <Button
                        variant='outline-info'
                        className='d-flex gap-05rem'
                        onClick={async () => {
                          const transaction = await getTransaction(
                            token,
                            transaction_id
                          );
                          setCurrentTransaction(transaction);
                          setTimeout(() => {
                            handleShowTransaction(transaction_id, false);
                            setLoading(false);
                          }, 1000);
                        }}
                      >
                        <CiCircleInfo className='text-info' />
                        <small>Ver detalle</small>
                      </Button>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementSections;
