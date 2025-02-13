import '../index.css';
import { brandImg, whatsappIcon, facebookIcon, instagramIcon, tiktokIcon } from "../assets/index.js";

const Footer = () => {
  return (
    <div className='footer'>
      <div>
        <div>
          <img
            src={brandImg}
            className='navbar-brand-img category-img'
          />
        </div>
        <p className='footer-style'>
          Expertos en hardware - productos de calidad - Bajos precios
        </p>
      </div>
      <div>
        <p>Búscanos en nuestras redes sociales</p>
        <div className='display-flex gap-1rem p-4'>
          <div>
            <img
              src={whatsappIcon}
              className='navbar-brand-img category-img social border-radius-8'
            />
            <p>Whatsapp</p>
          </div>
          <div>
            <img
              src={facebookIcon}
              className='navbar-brand-img category-img social border-radius-8'
            />
            <p>Facebook</p>
          </div>
          <div>
            <img
              src={instagramIcon}
              className='navbar-brand-img category-img social border-radius-8'
            />
            <p>Instagram</p>
          </div>
          <div>
            <img
              src={tiktokIcon}
              className='navbar-brand-img category-img social border-radius-8'
            />
            <p>Tik-Tok</p>
          </div>
        </div>
      </div>
      <p>Copyright 2025</p>
    </div>
  );
};

export default Footer;
