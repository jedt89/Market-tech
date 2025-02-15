import React from 'react';
import Slider from 'react-slick';
import {
  header01,
  header02,
  header03,
  header04,
  header05,
  header06
} from '../assets/index.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../index.css';

function HeaderSlider({ title }) {
  const settings = {
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
              <img src={header01} alt='Header 01' />
            </div>
            <div>
              <img src={header02} alt='Header 02' />
            </div>
            <div>
              <img src={header03} alt='Header 03' />
            </div>
            <div>
              <img src={header04} alt='Header 04' />
            </div>
            <div>
              <img src={header05} alt='Header 05' />
            </div>
            <div>
              <img src={header06} alt='Header 06' />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default HeaderSlider;
