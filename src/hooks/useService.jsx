import { useContext } from 'react';
import { toast } from 'react-hot-toast';
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
  getTransactions
} from '../services/fetchProducts';
// import allProducts from '../models/allProducts.json';
// import { MainContext } from '../context/MainContext.jsx';
// import { registerUser } from '../services/register.js';

const useService = () => {
  let userForTest = {
    token: 'token_for_testing_abcde',
    message: 'Usuario obtenido exitosamente', // Mientras el backend está en construcción
    id: 123,
    userName: 'Julio_Jaramillo',
    email: 'jaramillin@ejemplo.com'
  };

  // Auth actions
  const handleRegister = (email, password, name) => {
    try {
      // const response = registerUser(email, password, name);  //Mientras el back está en construcción
      toast.success('Registro exitoso', { position: 'top-right' });

      return userForTest;
    } catch (error) {
      toast.error('Error al registrarse', { position: 'top-right' });
      throw Error;
    }
  };

  const handleLogin = async (email, password) => {
    try {
      // const response = await loginSession(email, password); // Mientras el back está en construcción
      // return response;
      toast.success('Sesión iniciada con éxito', { position: 'top-right' });
      return userForTest;
    } catch (error) {
      toast.error('Error al iniciar sesión', { position: 'top-right' });
      throw error;
    }
  };

  const handleGetUserProfile = async (id) => {
    try {
      // const response = await getUserProfile(id);  // Mientras el back está en construcción
      // return response;
      return userForTest;
    } catch (error) {
      toast.error('Error al obtener perfil de usuario', {
        position: 'top-right'
      });
      throw error;
    }
  };

  const handleGetProducts = async (token) => {
    try {
      const products = await getAllProducts(token);
      return products;
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
      toast.success('Producto cargado con éxito', { position: 'top-right' });
      return response;
    } catch (error) {
      toast.error('Error al cargar producto', { position: 'top-right' });
      throw error;
    }
  };

  const handleUpdateProduct = async (productId, productData, token) => {
    try {
      const response = await updateProduct(productId, productData, token);
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
      toast.success('Producto eliminado con éxito', { position: 'top-right' });
      return response;
    } catch (error) {
      toast.error('Error al eliminar producto', { position: 'top-right' });
      throw error;
    }
  };

  const handleAddToCart = async (cartData, token) => {
    try {
      const response = await addToCart(cartData, token);
      toast.success('Producto agregado al carrito', { position: 'top-right' });
      return response;
    } catch (error) {
      toast.error('Error al agregar producto al carrito', {
        position: 'top-right'
      });
      throw error;
    }
  };

  const handleGetCartItems = async (token) => {
    try {
      const cartItems = await getCartItems(token);
      return cartItems;
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

  const handleCreateTransaction = async (transactionData, token) => {
    try {
      const response = await createTransaction(transactionData, token);
      toast.success('Transacción registrada con éxito', {
        position: 'top-right'
      });
      return response;
    } catch (error) {
      toast.error('Error al realizar la transacción', {
        position: 'top-right'
      });
      throw error;
    }
  };

  const handleGetTransactions = async (token, params = {}) => {
    try {
      const transactions = await getTransactions(token, params);
      return transactions;
    } catch (error) {
      toast.error('Error al obtener transacciones', { position: 'top-right' });
      throw error;
    }
  };

  return {
    handleLogin,
    handleGetUserProfile,
    handleGetProducts,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleAddToCart,
    handleGetCartItems,
    handleUpdateCartItem,
    handleDeleteCartItem,
    handleCreateTransaction,
    handleGetTransactions,
    handleRegister
  };
};

export default useService;
