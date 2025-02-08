import api from '../api/config';
import { handleApiError } from '../helpers/handleApiErrors';
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
    throw error;
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
    throw error;
  } catch (error) {
    handleApiError(error);
  }
};

// Obtener todos los productos
export const getAllProducts = async (token) => {
  try {
    // const response = await api.get('/products', {    // Mientras el backend está en construcción
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // if (response.status === 200) {
    //   return response.data;
    // }
    console.log('getAllProducts')
    return allProducts.map((product) => {
      product.subTotal = 0;
      product.quantity = 0;
      return product;
    });
    // throw error;
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
    throw error;
  } catch (error) {
    handleApiError(error);
  }
};

// Carrito de Compras (Comprar productos)

// Agregar un producto al carrito
export const addToCart = async (cartData, token) => {
  try {
    const response = await api.post('/user/cart', cartData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 201) {
      return response.data;
    }
    throw error;
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
    throw error;
  } catch (error) {
    handleApiError(error);
  }
};

// Actualizar la cantidad de un producto en el carrito
export const updateCartItem = async (id, action, token) => {
  try {
    const response = await api.post(
      `/user/cart/${id}`,
      { action },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw error;
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
    throw error;
  } catch (error) {
    handleApiError(error);
  }
};

// Transacciones (Comprar productos)

// Realizar una compra
export const createTransaction = async (transactionData, token) => {
  try {
    const response = await api.post('/user/cart/checkout', transactionData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 201) {
      return response.data;
    }
    throw error;
  } catch (error) {
    handleApiError(error);
  }
};

// Obtener todas las transacciones
export const getTransactions = async (token, params = {}) => {
  try {
    const response = await api.get('/user/cart/checkout', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    });
    if (response.status === 200) {
      return response.data;
    }
    throw error;
  } catch (error) {
    handleApiError(error);
  }
};

// Obtener todas las transacciones
export const cleanCart = async (token) => {
  try {
    const response = await api.delete('/user/cart', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      return response.data;
    }
    throw error;
  } catch (error) {
    handleApiError(error);
  }
};
