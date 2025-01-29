const BASE_URL = 'https://api.markettech.com';

// Configuración de axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api