import axios from 'axios';
import api from '../api/config';

// Gestión de Productos (Vender)

// Subir un nuevo producto
export const addProduct = async (productData, token) => {
  try {
    const response = await api.post('/products', productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Actualizar un producto
export const updateProduct = async (productId, productData, token) => {
  try {
    const response = await api.put(`/products/${productId}`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Obtener todos los productos
export const getProducts = async (token) => {
  try {
    const response = await api.get('/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Eliminar un producto
export const deleteProduct = async (productId, token) => {
  try {
    const response = await api.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Carrito de Compras (Comprar productos)

// Agregar un producto al carrito
export const addToCart = async (cartData, token) => {
  try {
    const response = await api.post('/cart', cartData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Obtener los productos del carrito
export const getCartItems = async (token) => {
  try {
    const response = await api.get('/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Actualizar la cantidad de un producto en el carrito
export const updateCartItem = async (cartItemId, amount, token) => {
  try {
    const response = await api.put(`/cart/${cartItemId}`, { amount }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Eliminar un producto del carrito
export const deleteCartItem = async (cartItemId, token) => {
  try {
    const response = await api.delete(`/cart/${cartItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Transacciones (Comprar productos)

// Realizar una compra
export const createTransaction = async (transactionData, token) => {
  try {
    const response = await api.post('/transactions', transactionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Obtener todas las transacciones
export const getTransactions = async (token, params = {}) => {
  try {
    const response = await api.get('/transactions', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};




// Contrato de API REST para Marketplace ‘Market - Tech’

// Base URL: https://api.markettech.com

//     1. Autenticación y Gestión de Usuario
// Registrar un nuevo usuario:

//     • POST /auth/register
// Request Body:
// {
//    "username": "usuario123",
//    "phone_number": "+5692345676",
//    "email": "usuario@ejemplo.com",
//    "password": "contrasena_secreta"
// }
// Response (201 Created):
// {
//    "message": "Usuario registrado con éxito",
//    "user": {
//    "id": 1,
//    "username": "usuario123",
//    "email": "usuario@ejemplo.com"
//    }
// }
//     • 
// Iniciar sesión con credenciales de usuario:
//     • POST /auth/login
// Request Body:
// {
//    "email": "usuario@ejemplo.com",
//    "password": "contrasena_secreta"
// }
// Response (200 OK):
// {
//    "message": "Inicio de sesión exitoso",
//    "token": "jwt_token_generado_aqui",
//    "user": {
//    "id": 1,
//    "username": "usuario123",
//    "email": "usuario@ejemplo.com"
//    }
// }





//     2. Gestión de Productos (Vender)
// Subir un nuevo producto para que el usuario lo venda:
//     • POST /products
// Request Headers:
// Authorization: Bearer <jwt_token> (para la autenticación del usuario).
// Request Body:
// {
//    "title": "Producto A",
//    "description": "Descripción del producto A",
//    "image_url": "https://link_a_imagen_del_producto.jpg",
//    "price": 2000,
//    "stock": 10
// }
// Response (201 Created):
// {
//  "message": "Producto añadido con éxito",
//  "product": {
//  "id": 1,
//  "user_id": 1,
//  "title": "Producto A",
//  "description": "Descripción del producto A",
//  "image_url": "https://link_a_imagen_del_producto.jpg",
//  "price": 2000,
//  "stock": 10
//  }
// }

// Actualizar un producto que el usuario ha subido para vender:
//     • PUT /products/{id}
// Request Headers:
// Authorization: Bearer <jwt_token> (para la autenticación del usuario).
// Request Params:
// {
//    "id": "12345”
// }
// Request Body:
// {
//    "title": "Producto A Modificado",
//    "description": "Descripción actualizada",
//    "image_url": "https://nuevo_link_a_imagen.jpg",
//    "price": 2500,
//    "stock": 5
// }
// Response (200 OK):
// {
//     "message": "Producto actualizado con éxito",
//     "product": {
//     "id": 1,
//     "user_id": 1,
//     "title": "Producto A Modificado",
//     "description": "Descripción actualizada",
//     "image_url": "https://nuevo_link_a_imagen.jpg",
//     "price": 2500,
//     "stock": 5
//  }
// }

// Obtener todos los productos del sistema:
//     • GET /products
// Request Headers:
// Authorization: Bearer <jwt_token> (para la autenticación del usuario).
// Response (200 OK):
// {
//     "message": "Lista de productos obtenida con éxito",
//     "products": [
//     {
//        "id": 1,
//        "user_id": 1,
//        "title": "Producto A",
//        "description": "Descripción del producto A",
//        "image_url": "https://link_a_imagen_del_producto.jpg",
//        "price": 2000,
//        "stock": 10
//        },
//     {
//        "id": 2,
//        "user_id": 2,
//        "title": "Producto B",
//        "description": "Descripción del producto B",
//        "image_url": "https://link_a_imagen_del_producto_b.jpg",
//        "price": 1500,
//        "stock": 20
//        }
//     ]
// }

// Eliminar un producto que el usuario ha subido para vender:
//     • DELETE /products/{id}
// Request Headers:
// Authorization: Bearer <jwt_token> (para la autenticación del usuario).
// Request Params:
// {
//    "id": "12345”
// }
// Response (200 OK):
// {
// "message": "Producto eliminado con éxito"
// }




//     3. Carrito de Compras (Comprar productos)
// El usuario agrega un producto al carrito de compras:
//     • POST /cart
// Request Headers:
// Authorization: Bearer <jwt_token> (para la autenticación del usuario).
// Request Body:
// {
//    "product_id": 1,
//    "amount": 2
// }
// Response (201 Created):
// {
//     "message": "Producto agregado al carrito",
//     "cart_item": {
//     "id": 1,
//     "user_id": 1,
//     "product_id": 1,
//     "amount": 2,
//     "date": "2025-01-25T12:34:56Z"
//     }
// }

// Obtener los productos añadidos al carrito por el usuario:
//     • GET /cart
// Request Headers:
//         ◦ Authorization: Bearer <jwt_token> (para la autenticación del usuario).
// Response (200 OK):
// [
//     {
//        "id": 1,
//        "user_id": 1,
//        "product_id": 1,
//        "amount": 2,
//        "product": {
//        "id": 1,
//        "title": "Producto A",
//        "price": 2000
//        }
//     }
// ]






// Actualizar la cantidad de un producto en el carrito de compras:
//     • PUT /cart/{id} 
// Request Headers:
// Authorization: Bearer <jwt_token> (para la autenticación del usuario).
// Request Params:
// {
//    "id": "12345”
// }
// Request Body:
// {
//    "amount": 3
// }
// Response (200 OK):
// {
//    "message": "Cantidad de producto actualizada en el carrito",
//    "cart_item": {
//    "id": 1,
//    "user_id": 1,
//    "product_id": 1,
//    "amount": 3
//    }
// }


// Eliminar un producto del carrito:
//     • DELETE /cart/{id} 
// Request Headers:
// Authorization: Bearer <jwt_token> (para la autenticación del usuario).
// Request Params:
// {
//    "id": "12345”
// }
// Response (200 OK):
// {
//     "message": "Producto eliminado del carrito"
// }

//     4. Transacciones (Comprar productos)
// El usuario realiza una compra, generando una transacción. La compra se realiza desde el carrito, y el sistema debe descontar el stock del producto:
//     • POST /transactions
// Request Body:
// {
//    "product_id": 1,
//    "amount": 2,
//    "unit_price": 2000,
//    "action": "purchase",
//    "total": 4000
// }
// Response (201 Created):
// {
//  "message": "Transacción registrada con éxito",
//  "transaction": {
//    "id": 1,
//    "user_id": 1,
//    "product_id": 1,
//    "type": "purchase",
//    "date": "2025-01-25T12:34:56Z",
//    "amount": 2,
//    "unit_price": 2000,
//    "action": "purchase",
//    "total": 4000
//    }
// }

// Obtener todas las transacciones realizadas en el sistema, como parte de su historial de compras:
//     • GET /transactions
// Request Headers:
//         ◦ Authorization: Bearer <jwt_token> (para la autenticación del usuario).
// Query Parameters opcionales:
//         ◦ page: Número de página para la paginación (por defecto es 1).
//         ◦ limit: Número de transacciones por página (por defecto es 10).
//         ◦ start_date: Fecha de inicio para filtrar las transacciones (formato YYYY-MM-DD).
//         ◦ end_date: Fecha de fin para filtrar las transacciones (formato YYYY-MM-DD).
// Response (200 OK):
// {
//    "message": "Historial de transacciones recuperado con éxito",
//    "transactions": [
// {
//    "id": 1,
//    "user_id": 1,
//    "product_id": 1,
//    "type": "purchase",
//    "date": "2025-01-25T12:34:56Z",
//    "amount": 2,
//    "unit_price": 2000,
//    "action": "purchase",
//    "total": 4000,
//    "product": {
//    "id": 1,
//    "title": "Producto A",
//    "description": "Descripción del producto A",
//    "price": 2000,
//    "image_url": "https://link_a_imagen_del_producto.jpg"
//    }
//    },
// {
//    "id": 2,
//    "user_id": 1,
//    "product_id": 2,
//    "type": "purchase",
//    "date": "2025-01-26T14:45:56Z",
//    "amount": 1,
//    "unit_price": 1500,
//    "action": "purchase",
//    "total": 1500,
//    "product": {
//    "id": 2,
//    "title": "Producto B",
//    "description": "Descripción del producto B",
//    "price": 1500,
//    "image_url": "https://link_a_imagen_del_producto_b.jpg"
//       }
//       }
//    ]
// }
// Notas importantes:
//     • Autenticación: Los usuarios deben obtener un token JWT para realizar operaciones que requieran autenticación. El token debe ser enviado en los encabezados de las solicitudes usando el formato Authorization: Bearer <jwt_token>.
//     • Paginación: Para las respuestas que devuelven listas de productos o transacciones, la API permite usar parámetros page y limit para la paginación.
