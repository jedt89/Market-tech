import { default as axios } from 'axios';

const URL_BASE = 'http://localhost:3000/signup';

export const registerUser = async (email, username, phone, password) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const data = {
    username: username,
    email: email,
    phone_number: phone,
    password_hash: password
  };

  try {
    const response = await axios.post(URL_BASE, data, config);
    const token = response.data.token;
    
    return token;
  } catch (error) {
    throw new Error('Error al registrar usuario')
  }
};
