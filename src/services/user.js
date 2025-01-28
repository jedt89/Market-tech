import { default as axios } from 'axios';

const URL_BASE = 'http://localhost:5000/api/auth/me';

export const getUserProfile = async (tokenValue) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenValue}`,
    }
  };

  try {
    const response = await axios.get(URL_BASE, config);
    console.log(response)
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error('Error')
  }
};
