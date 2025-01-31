import { default as axios } from 'axios';

const URL_BASE = 'http://localhost:3000/api/auth/user';

export const getUserProfile = async (tokenValue) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenValue}`,
    }
  };

  try {
    const response = await axios.get(URL_BASE, config);
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error('Error')
  }
};
