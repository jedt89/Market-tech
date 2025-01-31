import { registerUser } from '../services/register';
import { loginSession } from '../services/login';
import { getUserProfile } from '../services/user';
import { MainContext } from '../context/MainContext';
import { useContext } from 'react';
import allProducts from '../models/allProducts.json';

let userForTest = {
  // Mientras el backend está en construcción
  token: 'token_for_testing_abcde',
  message: 'Usuario obtenido exitosamente',
  id: 123,
  userName: 'Julio_Jaramillo',
  email: 'jaramillin@ejemplo.com'
};

// Auth actions
const handleRegister = (email, password, name) => {
  try {
    const response = registerUser(email, password, name);
    return response;
  } catch (error) {
    console.error('Register user error', error);
    throw Error;
  }
};

const handleLogin = async (email, password) => {
  try {
    // const response = await loginSession(email, password); // Mientras el back está en construcción
    // return response;
    return userForTest;
  } catch (error) {
    console.error('Login session error', error);
    throw Error;
  }
};

const handleGetUserProfile = async (id) => {
  try {
    // const response = await getUserProfile(id);  // Mientras el back está en construcción
    // return response;
    return userForTest;
  } catch (error) {
    console.error('Get user profile error', error);
    throw Error;
  }
};

const handleGetProducts = async (user_id, token) => {
  try {
    // const response = await getproducts(user_id);  // Mientras el back está en construcción
    // return response;
    const products = allProducts;
    return products;
  } catch (error) {
    console.error('Get products error', error);
    throw Error;
  }
};

const handleAddProducts = async (user_id, token) => {
  try {
    // const response = await addProduct(user_id, token);  // Mientras el back está en construcción
    // return response;
    return { message: 'Producto cargado con éxito' };
  } catch (error) {
    console.error('Get products error', error);
    throw Error;
  }
};

export { handleRegister, handleLogin, handleGetUserProfile, handleGetProducts };
