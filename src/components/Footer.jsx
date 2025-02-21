import '../index.css';
import {
  brandImg,
  whatsappIcon,
  facebookIcon,
  instagramIcon,
  tiktokIcon,
  brandImgLogo
} from '../assets/index.js';

const Footer = () => {
  return (
    <div className='footer'>
      <div>
        <div>
          <img
            src={brandImgLogo}
            style={{width: '50px'}}
            alt='Brand'
          />
          <small className='head-title' style={{ paddingLeft: '10px' }}>
            Market-Tech
          </small>
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
              className='category-img social border-radius-8'
            />
          </div>
          <div>
            <img
              src={facebookIcon}
              className='category-img social border-radius-8'
            />
          </div>
          <div>
            <img
              src={instagramIcon}
              className='category-img social border-radius-8'
            />
          </div>
          <div>
            <img
              src={tiktokIcon}
              className='category-img social border-radius-8'
            />
          </div>
        </div>
      </div>
      <p>Copyright 2025</p>
    </div>
  );
};

export default Footer;
