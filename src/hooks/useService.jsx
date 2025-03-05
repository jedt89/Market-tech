import { toast } from 'react-hot-toast';
import { registerUser } from '../services/register.js';
import { loginSession } from '../services/login.js';
import {
  addProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
  createTransaction,
  getTransactions,
  cleanCart,
  uploadFile,
  getTransactionDetail
} from '../services/fetchProducts';

const useService = () => {
  const handleRegister = async (email, username, phone, password) => {
    try {
      const response = await registerUser(email, username, phone, password);
      if (response)
        toast.success('Registro exitoso', { position: 'top-right' });
      return response;
    } catch (error) {
      toast.error('Error al registrarse', { position: 'top-right' });
      throw error;
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await loginSession(email, password);
      if (response) {
        response.data.token = response.token;
        localStorage.setItem('marketTechSession', JSON.stringify(response));
        toast.success('Sesión iniciada con éxito', { position: 'top-right' });
      }
      return response.data;
    } catch (error) {
      toast.error('Error al iniciar sesión', { position: 'top-right' });
      throw error;
    }
  };

  const handleGetProducts = async () => {
    try {
      const products = await getAllProducts();
      if (products) return products;
    } catch (error) {
      toast.error('Error al obtener productos', { position: 'top-right' });
      throw error;
    }
  };

  const handleAddProduct = async (
    { productName, imageUrl, productDescription, categoryId, price, stock },
    token
  ) => {
    try {
      const newProduct = {
        title: productName,
        description: productDescription,
        price: Number(price),
        image_url: imageUrl,
        stock: Number(stock),
        category_id: Number(categoryId)
      };
      const response = await addProduct(newProduct, token);
      if (response)
        toast.success('Producto guardado con éxito', { position: 'top-right' });
      return response;
    } catch (error) {
      toast.error('Error al cargar producto', { position: 'top-right' });
      throw error;
    }
  };

  const handleUpdateProduct = async (productId, productData, token) => {
    try {
      const response = await updateProduct(productId, productData, token);
      if (response)
        toast.success('Producto actualizado con éxito', {
          position: 'top-right'
        });
      return response;
    } catch (error) {
      toast.error('Error al actualizar producto', { position: 'top-right' });
      throw error;
    }
  };

  const handleDeleteProduct = async (productId, token) => {
    try {
      const response = await deleteProduct(productId, token);
      if (response)
        toast.success('Producto eliminado con éxito', {
          position: 'top-right'
        });
      return response;
    } catch (error) {
      toast.error('Error al eliminar producto', { position: 'top-right' });
      throw error;
    }
  };

  const handleAddToCart = async (product, token) => {
    try {
      const response = await addToCart(product, token);
      if (response)
        toast.success('Producto agregado al carrito', {
          position: 'top-right'
        });
      return response;
    } catch (error) {
      toast.error('Error al agregar producto al carrito', {
        position: 'top-right'
      });
      throw error;
    }
  };

  const handleGetCartItems = async (token, id) => {
    try {
      const cartItems = await getCartItems(token, id);
      if (cartItems) return cartItems;
    } catch (error) {
      toast.error('Error al obtener productos del carrito', {
        position: 'top-right'
      });
      throw error;
    }
  };

  const handleUpdateCartItem = async (cartItemId, action, token) => {
    try {
      const response = await updateCartItem(cartItemId, action, token);
      if (response)
        toast.success('Cantidad de producto actualizada en el carrito', {
          position: 'top-right'
        });
      return response;
    } catch (error) {
      toast.error('Error al actualizar cantidad en el carrito', {
        position: 'top-right'
      });
      throw error;
    }
  };

  const handleDeleteCartItem = async (cartItemId, token) => {
    try {
      const response = await deleteCartItem(cartItemId, token);
      if (response)
        toast.success('Producto eliminado del carrito', {
          position: 'top-right'
        });
      return response;
    } catch (error) {
      toast.error('Error al eliminar producto del carrito', {
        position: 'top-right'
      });
      throw error;
    }
  };

  const handleCleanCart = async (token) => {
    try {
      const response = await cleanCart(token);
      if (response)
        toast.success('Carrito limpiado con éxito', { position: 'top-right' });
      return response;
    } catch (error) {
      toast.error('Error al limpiar el carrito', { position: 'top-right' });
      throw error;
    }
  };

  const handleCreateTransaction = async (token, currentCart) => {
    try {
      const response = await createTransaction(token, currentCart);
      if (response) return response;
    } catch (error) {
      toast.error('Error al realizar la transacción', {
        position: 'top-right'
      });
      throw error;
    }
  };

  const handleGetTransactions = async (token, userId) => {
    try {
      const transactions = await getTransactions(token, userId);
      if (transactions) return transactions;
    } catch (error) {
      toast.error('Error al obtener transacciones', { position: 'top-right' });
      throw error;
    }
  };

  const handleGetTransactionDetail = async (token, transactionId) => {
    try {
      const transaction = await getTransactionDetail(token, transactionId);
      if (transaction) return transaction;
    } catch (error) {
      toast.error('Error al obtener transacciones', { position: 'top-right' });
      throw error;
    }
  };

  const handleUploadFile = async (token, formData) => {
    try {
      const response = await uploadFile(token, formData);
      if (response)
        toast.success('Archivo subido con éxito', { position: 'top-right' });
      return response;
    } catch (error) {
      toast.error('Error al subir el archivo', { position: 'top-right' });
      throw error;
    }
  };

  return {
    handleRegister,
    handleLogin,
    handleGetProducts,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleAddToCart,
    handleGetCartItems,
    handleUpdateCartItem,
    handleDeleteCartItem,
    handleCleanCart,
    handleCreateTransaction,
    handleGetTransactions,
    handleGetTransactionDetail,
    handleUploadFile
  };
};

export default useService;
