import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';
import { MainContext } from '../context/MainContext';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { IoBagCheckOutline } from 'react-icons/io5';

const TransactionModal = () => {
  const { currentTransaction, user } = useContext(MainContext);
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

  if (currentTransaction) {
    transactionData = currentTransaction[0] || null;
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
          {buy ? '¡Compra exitosa!' : 'Detalle de transacción'}
        </Modal.Title>
        <IoIosClose
          className='text-white close-icon'
          onClick={() => handleCloseTransaction(user.id, buy)}
        />
      </Modal.Header>
      <Modal.Body className='modal-body text-white flex-column align-itemns-start'>
        {!buy && (
          <div>
            <p>
              <strong className='text-warning mr-2'>Transacción número:</strong>{' '}
              {transactionData.transaction_id}
            </p>
            <p>
              <strong className='text-warning mr-2'>
                Nombre del comprador:
              </strong>{' '}
              {transactionData.buyer_name}
            </p>
            <p>
              <strong className='text-warning mr-2'>
                Nombre del vendedor:
              </strong>{' '}
              {transactionData.seller_name}
            </p>
            <p>
              <strong className='text-warning mr-2'>Fecha:</strong>{' '}
              {getDate(transactionData.date)}
            </p>
            <p>
              <strong className='text-warning mr-2'>ID de transacción:</strong>{' '}
              {transactionData.transaction_id}
            </p>
            <p>
              <strong className='text-warning mr-2'>Total compra:</strong>{' '}
              {Math.trunc(transactionData.subtotal).toLocaleString('es-CL')}
            </p>
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
      <Modal.Footer>
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
