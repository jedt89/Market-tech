import '../index.css';
import { brandImg, whatsappIcon, facebookIcon, instagramIcon, tiktokIcon } from "../assets/index.js";

const Footer = () => {
  return (
    <div className='footer'>
      <div>
        <div>
          <img
            src={brandImg}
            className='width-100-percent'
          />
        </div>
        <p className='footer-style'>
          Expertos en hardware - productos de calidad - Bajos precios
        </p>
      </div>
      <div>
        <p>Búscanos en nuestras redes sociales</p>
        <div className='display-flex gap-2rem p-4 flex-wrap justify-center'>
          <div>
            <img
              src={whatsappIcon}
              className='navbar-brand-img category-img social border-radius-8'
            />
          </div>
          <div>
            <img
              src={facebookIcon}
              className='navbar-brand-img category-img social border-radius-8'
            />
          </div>
          <div>
            <img
              src={instagramIcon}
              className='navbar-brand-img category-img social border-radius-8'
            />
          </div>
          <div>
            <img
              src={tiktokIcon}
              className='navbar-brand-img category-img social border-radius-8'
            />
          </div>
        </div>
      </div>
      <p>Copyright 2025</p>
    </div>
  );
};

export default Footer;
