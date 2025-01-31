import api from '../api/config';
import allProducts from '../models/allProducts.json';

// Gestión de Productos (Vender)

// Subir un nuevo producto
export const addProduct = async (productData, token) => {
  try {
    const response = await api.post('/products', productData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 201) {
      return response.data;
    }
    throw new Error('Error al agregar producto');
  } catch (error) {
    handleApiError(error);
  }
};

// Actualizar un producto
export const updateProduct = async (productId, productData, token) => {
  try {
    const response = await api.put(`/products/${productId}`, productData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Error al actualizar producto');
  } catch (error) {
    handleApiError(error);
  }
};

// Obtener todos los productos
export const getAllProducts = async (token) => {
  try {
    // const response = await api.get('/products', {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // if (response.status === 200) {
    //   return response.data;
    // }
    return allProducts; // Mientras el backend está en construcción
  } catch (error) {
    handleApiError(error);
  }
};

// Eliminar un producto
export const deleteProduct = async (productId, token) => {
  try {
    const response = await api.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Error al eliminar producto');
  } catch (error) {
    handleApiError(error);
  }
};

// Carrito de Compras (Comprar productos)

// Agregar un producto al carrito
export const addToCart = async (cartData, token) => {
  try {
    const response = await api.post('/cart', cartData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 201) {
      return response.data;
    }
    throw new Error('Error al agregar producto al carrito');
  } catch (error) {
    handleApiError(error);
  }
};

// Obtener los productos del carrito
export const getCartItems = async (token) => {
  try {
    const response = await api.get('/cart', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Error al obtener productos del carrito');
  } catch (error) {
    handleApiError(error);
  }
};

// Actualizar la cantidad de un producto en el carrito
export const updateCartItem = async (cartItemId, amount, token) => {
  try {
    const response = await api.put(
      `/cart/${cartItemId}`,
      { amount },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Error al actualizar cantidad en el carrito');
  } catch (error) {
    handleApiError(error);
  }
};

// Eliminar un producto del carrito
export const deleteCartItem = async (cartItemId, token) => {
  try {
    const response = await api.delete(`/cart/${cartItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Error al eliminar producto del carrito');
  } catch (error) {
    handleApiError(error);
  }
};

// Transacciones (Comprar productos)

// Realizar una compra
export const createTransaction = async (transactionData, token) => {
  try {
    const response = await api.post('/transactions', transactionData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 201) {
      return response.data;
    }
    throw new Error('Error al realizar la transacción');
  } catch (error) {
    handleApiError(error);
  }
};

// Obtener todas las transacciones
export const getTransactions = async (token, params = {}) => {
  try {
    const response = await api.get('/transactions', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Error al obtener transacciones');
  } catch (error) {
    handleApiError(error);
  }
};

// Manejo de errores de la API
const handleApiError = (error) => {
  // Verifica si la respuesta tiene datos de error
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
