import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { MainContext } from '../context/MainContext';
import { VscCircleLargeFilled } from 'react-icons/vsc';
import { MdAccessTime } from 'react-icons/md';
import { ModalContext } from '../context/ModalContext';
import { profileImg } from "../assets/index.js";
import ManagementSections from '../components/ManagementSections';
import useService from '../hooks/useService';
import '../index.css';

const ProfileModal = () => {
  const { handleGetTransactions } = useService();
  const { token, user, allProducts, transactions, setTransactions } =
    useContext(MainContext);
  const { showProfile, handleCloseProfile } = useContext(ModalContext);

  const fetchTransactions = async () => {
    try {
      const transactions = await handleGetTransactions(token);
      setTransactions(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const getFilteredProducts = () => {
    if (user && user.id) {
      return allProducts.filter((product) => product.user_id === user.id);
    }
  };

  useEffect(() => {
    if (token) fetchTransactions(token);
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
              src={profileImg}
              alt='Profile'
            />
            <div>
              <p className='text-warning profile-name'>{user.username}</p>
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
        <ManagementSections
          products={getFilteredProducts}
          transactions={transactions}
        />
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
