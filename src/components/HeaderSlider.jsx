import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../index.css';

function HeaderSlider({ title }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true
  };

  return (
    <div className='header-slider-container'>
      <h2 className='text-white'>{title}</h2>
      <div className='display-flex justify-center'>
        <div className='slider-container'>
          <Slider {...settings}>
            <div>
              <img src='../src/assets/img/header-01.png' alt='Header 01' />
            </div>
            <div>
              <img src='../src/assets/img/header-02.png' alt='Header 02' />
            </div>
            <div>
              <img src='../src/assets/img/header-03.png' alt='Header 03' />
            </div>
            <div>
              <img src='../src/assets/img/header-04.png' alt='Header 04' />
            </div>
            <div>
              <img src='../src/assets/img/header-05.png' alt='Header 05' />
            </div>
            <div>
              <img src='../src/assets/img/header-06.png' alt='Header 06' />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default HeaderSlider;
