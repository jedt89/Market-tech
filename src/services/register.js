import api from '../api/config';
import { handleApiError } from '../helpers/handleApiErrors';

export const registerUser = async (email, username, phone, password) => {
  const data = {
    username: username,
    email: email,
    phone_number: phone,
    password_hash: password
  };

  try {
    const response = await api.post(`/signup`, data);
    if (response.status === 200) {
      return response.data;
    }
    throw error;
  } catch (error) {
    handleApiError(error);
  }
};
