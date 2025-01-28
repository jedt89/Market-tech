import { default as axios } from 'axios';

const URL_BASE = 'http://localhost:5000/api/auth/login';

export const loginSession = async (email, password) => {
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
    const token = response.data.token;
    console.log(response)
    return token;
  } catch (error) {
    throw new Error('Error al iniciar sesión')
  }
};
