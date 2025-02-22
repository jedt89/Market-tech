import React, { useContext, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { MainContext } from '../context/MainContext';
import { ModalContext } from '../context/ModalContext';
import { profileImg } from '../assets/index.js';
import ManagementSections from '../components/ManagementSections';
import useService from '../hooks/useService';
import '../index.css';

const ProfileModal = () => {
  const { handleGetTransactions } = useService();
  const { token, user, setTransactions, setLoading } = useContext(MainContext);
  const { showProfile, handleCloseProfile } = useContext(ModalContext);

  const fetchTransactions = async () => {
    setLoading(false);
    try {
      const transactions = await handleGetTransactions(token, user.id);
      setTransactions(transactions);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching transactions:', error);
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
      size='lg'
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
          <div className='flex-column align-items-center gap-2rem text-center justify-center'>
            <img className='profile-image' src={profileImg} alt='Profile' />
            <p className='text-warning profile-name'>{user.username}</p>
          </div>
        </div>
        <ManagementSections />
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
