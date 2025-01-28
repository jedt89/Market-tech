import { default as axios } from 'axios';

const URL_BASE = 'http://localhost:5000/api/auth/register';

export const register = async (email, password) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const data = {
    email: email,
    password: password
  };

  try {
    const response = await axios.post(URL_BASE, data, config);
    console.log(response)
    const token = response.data.token;
    
    return token;
  } catch (error) {
    throw new Error('Error al iniciar sesión')
  }
};
