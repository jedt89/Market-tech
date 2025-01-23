import Form from 'react-bootstrap/Form';

function HeaderSearchBar() {
  return (
    <>
      <Form.Control
        type="text"
        placeholder='¿Qué estás buscando?'
        variant='warning'
        style={{width: '600px', borderRadius: '50px', margin: '20px', textAlign: 'center'}}
      />
    </>
  );
}

export default HeaderSearchBar;