import Form from 'react-bootstrap/Form';
import { FaSearch } from 'react-icons/fa';

function HeaderSearchBar() {
  return (
    <div className='display-flex justify-center max-width-500 width-100-percent'>
      <div className='header-searchbar-container'>
        <Form.Control
          type='text'
          placeholder='¿Qué estás buscando?'
          variant='warning'
          className='header-searchbar-input'
        />
        <FaSearch className='header-searchbar-icon' />
      </div>
    </div>
  );
}

export default HeaderSearchBar;
