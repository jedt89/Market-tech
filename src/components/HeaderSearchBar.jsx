import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext';
import { ModalContext } from '../context/ModalContext';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import '../index.css';

function HeaderSearchBar() {
  const { handleShowAllProducts } = useContext(ModalContext);
  const { textSearched, setTextSearched } = useContext(MainContext);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleShowAllProducts();
    }
  };

  return (
    <div className='display-flex justify-center max-width-500 width-100-percent'>
      <div className='header-searchbar-container'>
        <Form.Control
          type='text'
          placeholder='¿Qué estás buscando?'
          variant='warning'
          className='header-searchbar-input'
          value={textSearched}
          onChange={(event) => setTextSearched(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FaSearch
          className='header-searchbar-icon'
          onClick={handleShowAllProducts}
        />
      </div>
    </div>
  );
}

export default HeaderSearchBar;