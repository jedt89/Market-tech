import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { MainContextProvider } from './context/MainContext.jsx';
import { CartContextProvider } from './context/CartContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ModalContextProvider } from './context/ModalContext.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MainContextProvider>
      <ModalContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ModalContextProvider>
    </MainContextProvider>
    <Toaster />
  </BrowserRouter>
);
