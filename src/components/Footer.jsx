import '../index.css';
import { brandImgLogo, githubIcon, linkedinIcon } from '../assets/index.js';

const Footer = () => {
  return (
    <div className='footer'>
      <div>
        <p className='footer-style head-title'>Expertos en hardware</p>
        <div>
          <img src={brandImgLogo} style={{ width: '50px' }} alt='Brand' />
          <small className='head-title' style={{ paddingLeft: '10px' }}>
            Market-Tech
          </small>
        </div>
      </div>
      <div>
        <p className='text-warning' style={{ fontSize: '18px' }}>
          Búscanos en nuestras redes sociales
        </p>
        <div
          className='display-flex gap-2rem p-4 flex-wrap justify-center'
          style={{ gap: '3rem' }}
        >
          <div>
            <div>
              <p className='mb-3 width-100-percent'>Jonathan Díaz</p>
              <div className='display-flex align-items-center gap-1rem'>
                <a
                  href='https://github.com/jedt89'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    src={githubIcon}
                    className='category-img social border-radius-8'
                    alt='GitHub'
                  />
                </a>
                <a
                  href='https://www.linkedin.com/in/jonathan-diaz-tobar-241572186'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    src={linkedinIcon}
                    className='category-img social border-radius-8'
                    alt='LinkedIn'
                  />
                </a>
              </div>
            </div>
          </div>

          <div>
            <p className='mb-3'>Marcos Gonzalvez</p>
            <div className='display-flex align-items-center gap-1rem'>
              <a
                href='https://github.com/Makuharg'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  src={githubIcon}
                  className='category-img social border-radius-8'
                  alt='GitHub'
                />
              </a>
              <a
                href='https://www.linkedin.com/in/marcosgondesign'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  src={linkedinIcon}
                  className='category-img social border-radius-8'
                  alt='LinkedIn'
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <p>Copyright 2025</p>
    </div>
  );
};

export default Footer;
