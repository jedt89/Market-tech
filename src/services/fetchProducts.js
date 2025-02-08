import api from '../api/config';
import { handleApiError } from '../helpers/handleApiErrors';
import allProducts from '../models/allProducts.json';
import categories from '../models/categories.json';

// Gestión de Productos (Vender)

// Subir un nuevo producto
export const addProduct = async (productData, token) => {
  try {
    const response = await api.post('/user/product', productData, {
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
    const response = await api.get('/products', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      return response.data.map((product) => {
        const category = categories.find(
          (category) => category.id === product.category_id || 1
        );
        product.category = category.name;
        product.category_id = product.category_id || 1;
        product.subTotal = 0;
        product.quantity = 0;
        product.price = Math.trunc(product.price);
        return product;
      });
    }
    throw error;
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
export const getCartItems = async (token, userId) => {
  try {
    const response = await api.get(`/user/cart/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      return response.data.map((data) => {
        return data;
      });
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
export const getTransactions = async (token) => {
  try {
    const response = await api.get('/user/cart/checkout', {
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
