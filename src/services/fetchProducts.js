import api from '../api/config';
import { defaultProductImg } from '../assets';
import { handleApiError } from '../helpers/handleApiErrors';
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
  } catch (error) {
    handleApiError(error);
  }
};

// Obtener todos los productos
export const getAllProducts = async () => {
  try {
    const response = await api.get('/products', {});
    if (response.status === 200) {
      return response.data.map((product) => {
        const category = categories.find(
          (category) => category.id === product.category_id || 1
        );
        product.image_url = product.image_url || defaultProductImg;
        product.category = category.name;
        product.category_id = product.category_id || 1;
        product.subtotal = 0;
        product.quantity = 0;
        product.price = Math.trunc(product.price);
        product.product_id = product.product_id
          ? product.product_id
          : product.id;
        return product;
      });
    }
  } catch (error) {
    handleApiError(error);
  }
};

// Eliminar un producto
export const deleteProduct = async (productId, token) => {
  try {
    const response = await api.delete(`/user/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      return response.data;
    }
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
    if (response.status === 201 || response.status === 200) {
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
  }
};

// Obtener los productos del carrito
export const getCartItems = async (token, user_id) => {
  try {
    const response = await api.get(`/cart/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      response.data = response.data.map((product) => {
        const category = categories.find(
          (category) => category.id === product.category_id || 1
        );
        product.image_url = product.image_url || defaultProductImg;
        product.category = category.name;
        product.category_id = product.category_id || 1;
        product.quantity = product.quantity;
        product.price = Math.trunc(product.price);
        product.subtotal = Math.trunc(product.price) * product.quantity;
        product.product_id = product.product_id
          ? product.product_id
          : product.id;
        return product;
      });

      return response.data.sort((a, b) => a.title.localeCompare(b.title));
    }
  } catch (error) {
    handleApiError(error);
  }
};

// Actualizar la cantidad de un producto en el carrito
export const updateCartItem = async (productId, action, token) => {
  try {
    const response = await api.post(
      `/user/cart/update/${productId}`,
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
  } catch (error) {
    handleApiError(error);
  }
};

// Eliminar un producto del carrito
export const deleteCartItem = async (cartItemId, token) => {
  try {
    const response = await api.delete(`/user/cart/product/${cartItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
  }
};

// Transacciones (Comprar productos)
// Realizar una compra
export const createTransaction = async (token, currentCart) => {
  currentCart.total_price = currentCart.totalCart;
  try {
    const response = await api.post(
      '/user/cart/checkout',
      { cart: currentCart },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
  }
};

// Obtener todas las transacciones
export const getTransactions = async (token, userId) => {
  try {
    const response = await api.get(`/transactions/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
  }
};

// Obtener detalle de transacción
export const getTransactionDetail = async (token, transactionId) => {
  try {
    const response = await api.get(`/transactions/detail/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
  }
};

// Limpiar carrito
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
  } catch (error) {
    handleApiError(error);
  }
};

// Subir archivo
export const uploadFile = async (token, formData) => {
  console.log(formData);
  try {
    const response = await api.post('/user/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
  }
};
