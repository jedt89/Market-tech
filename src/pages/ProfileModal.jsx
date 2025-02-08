import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { MainContext } from '../context/MainContext';
import { VscCircleLargeFilled } from 'react-icons/vsc';
import { MdAccessTime } from 'react-icons/md';
import ManagementSections from '../components/ManagementSections';
import { getTransactions } from '../services/fetchProducts';
import { ModalContext } from '../context/ModalContext';
import useService from '../hooks/useService';
import '../index.css';

const ProfileModal = () => {
  const { handleGetProducts } = useService();
  const { token, user } = useContext(MainContext);
  const { showProfile, handleCloseProfile } = useContext(ModalContext);
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchProducts = async (user) => {
    try {
      let products = await handleGetProducts(user.id);
      setProducts(products);
      setTransactions(products); // Mientras el backend está en construcción
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchTransactions = async (user) => {
    try {
      const transactions = await getTransactions(user.token);
      setTransactions(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProducts(user);
      // fetchTransactions(user);
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
          <IoIosClose
            className='text-white close-icon'
            onClick={() => {
              handleCloseProfile(user.id);
            }}
          />
        </div>
      </Modal.Header>
      <Modal.Body className='text-white width-100-percent'>
        <div className='flex-column border-radius-8 text-center gap-1rem width-100-percent profile-info'>
          <div className='display-flex align-items-center gap-2rem text-center justify-center'>
            <img
              className='profile-image'
              src='../src/assets/img/profile-2.png'
              alt='Profile'
            />
            <div>
              <p className='text-warning profile-name'>Julio Jaramillo</p>
              <div className='profile-description'>
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
        </div>
        <ManagementSections products={products} transactions={transactions} />
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
