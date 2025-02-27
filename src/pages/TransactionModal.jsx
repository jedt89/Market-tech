import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';
import { MainContext } from '../context/MainContext';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { IoBagCheckOutline } from 'react-icons/io5';

const TransactionModal = () => {
  const { currentTransaction, user, allProducts } = useContext(MainContext);
  const { showTransaction, handleCloseTransaction, buy } =
    useContext(ModalContext);
  let transactionData = {};

  const getDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getProductName = (id, products) => {
    const product_name = products.find((product) => product.id === id);
    return product_name.title || 'Sin nombre';
  };

  if (currentTransaction) {
    transactionData.transaction_id = currentTransaction[0].transaction_id;
    transactionData.id = currentTransaction[0].id;
    transactionData.products = currentTransaction;
    transactionData.total = currentTransaction.reduce((sum, transaction) => {
      return sum + Math.trunc(transaction.subtotal);
    }, 0);
  }

  return (
    <Modal
      show={showTransaction}
      onHide={handleCloseTransaction}
      centered
      backdrop='static'
      size='lg'
    >
      <Modal.Header className='text-white d-flex justify-content-between align-items-center'>
        <Modal.Title className='modal-title'>
          {buy ? '¡Compra exitosa!' : 'Detalle de transacción - productos'}
        </Modal.Title>
        <IoIosClose
          className='text-white close-icon'
          onClick={() => handleCloseTransaction(user.id, buy)}
        />
      </Modal.Header>
      <Modal.Body className='modal-body text-white flex-column'>
        {!buy && currentTransaction && (
          <div className='flex-column gap-1rem' style={{maxHeight: '500px'}}>
            {currentTransaction &&
              transactionData.products.length &&
              transactionData.products.map(
                ({
                  product_id,
                  date,
                  buyer_name,
                  seller_name,
                  unit_price,
                  quantity,
                  subtotal,
                  transaction_id
                }) => {
                  return (
                    <div key={product_id} className='form-control'>
                      <div>
                        <p className='text-warning mr-2'>
                          Nombre del producto:
                        </p>{' '}
                        {getProductName(product_id, allProducts)}
                      </div>
                      <div>
                        <p className='text-warning mr-2'>Fecha:</p>{' '}
                        {getDate(date)}
                      </div>
                      <div>
                        <p className='text-warning mr-2'>
                          Nombre del comprador:
                        </p>{' '}
                        {buyer_name}
                      </div>
                      <div>
                        <p className='text-warning mr-2'>
                          Nombre del vendedor:
                        </p>{' '}
                        {seller_name}
                      </div>
                      <div>
                        <p className='text-warning mr-2'>
                          ID de producto:
                        </p>{' '}
                        {product_id}
                      </div>
                      <div>
                        <p className='text-warning mr-2'>
                          ID de transacción:
                        </p>{' '}
                        {transaction_id}
                      </div>
                      <div>
                        <p className='text-warning mr-2'>
                          Precio unitario:
                        </p>{' '}
                        ${Math.trunc(unit_price).toLocaleString('es-CL')}
                      </div>
                      <div>
                        <p className='text-warning mr-2'>Cantidad:</p>{' '}
                        {quantity}
                      </div>
                      <div>
                        <p className='text-warning mr-2'>Subtotal:</p> $
                        {Math.trunc(subtotal).toLocaleString('es-CL')}
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        )}
        {buy && (
          <div>
            <div className='flex-column align-items-center justify-center gap-1rem'>
              <IoBagCheckOutline className='checkout-icon-success' />
              <p>Su compra ha sido realizada de manera exitosa</p>
              <p>¡Gracias por preferirnos!</p>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className='display-flex align-items-center justify-between width-100-percent'>
        <div className='text-white'>
          <p>
            Precio total: $
            {Math.trunc(transactionData.total).toLocaleString('es-CL')}
          </p>
        </div>

        <Button
          variant='outline-warning'
          onClick={() => handleCloseTransaction(user.id, buy)}
          className='modal-btn-cancel'
        >
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransactionModal;
