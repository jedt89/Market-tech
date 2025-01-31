import { default as axios } from 'axios';

const URL_BASE = 'http://localhost:3000/api/auth/register';

export const registerUser = async (email, password, name) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const data = {
    name: name,
    email: email,
    password: password
  };

  try {
    const response = await axios.post(URL_BASE, data, config);
    const token = response.data.token;
    
    return token;
  } catch (error) {
    throw new Error('Error al registrar usuario')
  }
};
