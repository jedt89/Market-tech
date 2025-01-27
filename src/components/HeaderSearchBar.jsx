import Form from 'react-bootstrap/Form';

import { FaSearch } from 'react-icons/fa';

function HeaderSearchBar() {
  return (
    <div className='display-flex justify-center'>
      <div style={{ position: 'relative', width: '100%' }}>
        <Form.Control
          type='text'
          placeholder='¿Qué estás buscando?'
          variant='warning'
          style={{
            width: '100%',
            borderRadius: '50px',
            textAlign: 'center',
            paddingRight: '40px'
          }}
        />
        <FaSearch
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#ccc'
          }}
        />
      </div>
    </div>
  );
}

export default HeaderSearchBar;
