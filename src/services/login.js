import api from '../api/config';
import { handleApiError } from '../helpers/handleApiErrors';

export const loginSession = async (email, password) => {
  const data = {
    email: email,
    password_hash: password
  };

  try {
    const response = await api.post(`/login`, data);
    if (response.status === 200) {
      return response.data;
    }
    throw error;
  } catch (error) {
    handleApiError(error);
  }
};
