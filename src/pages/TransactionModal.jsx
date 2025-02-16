import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import { MainContext } from '../context/MainContext';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';

const TransactionModal = () => {
  const { currentTransaction, user } = useContext(MainContext);
  const { showTransaction, handleCloseTransaction } = useContext(ModalContext);
  const { buyer_name, date, items, seller_name, transaction_id } =
    currentTransaction;

  const getDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

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
          Detalle de transacción
        </Modal.Title>
        <IoIosClose
          className='text-white close-icon'
          onClick={handleCloseTransaction}
        />
      </Modal.Header>
      <Modal.Body className='modal-body text-white flex-column align-itemns-start'>
        <div>Transacción número #{transaction_id}</div>
        <p>
          <strong>Nombre del comprador:</strong> {buyer_name}
        </p>
        <p>
          <strong>Nombre del vendedor:</strong> {seller_name}
        </p>
        <p>
          <strong>Fecha:</strong> {getDate(date)}
        </p>
        <p>
          <strong>ID de transacción:</strong> {transaction_id}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-warning'
          onClick={() => handleCloseTransaction(user.id)}
          className='modal-btn-cancel'
        >
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransactionModal;
