import api from '../api/config';
import { handleApiError } from '../helpers/handleApiErrors';

export const getUserProfile = async (token) => {
  try {
    const response = await api.post(`/user`, token);
    if (response.status === 200) {
      return response.data;
    }
    throw error;
  } catch (error) {
    handleApiError(error);
  }
};
