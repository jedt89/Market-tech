export const handleApiError = (error) => {
  if (error.response && error.response.data) {
    if (error.response.status === 400) {
      console.error('Bad Request: ', error.response.data);
    } else if (error.response.status === 401) {
      console.error('Unauthorized: ', error.response.data);
    } else if (error.response.status === 500) {
      console.error('Server Error: ', error.response.data);
    } else {
      console.error('Error desconocido: ', error.response.data);
    }
  } else {
    console.error('Error de conexión o problema con el servidor');
  }
  throw error;
};
