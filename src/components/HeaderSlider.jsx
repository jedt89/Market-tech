import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import {
  brandImg,
  header01,
  header02,
  header03,
  header04,
  header05,
  header06
} from '../assets/index.js';
import '../index.css';

function HeaderSlider({ title }) {
  return (
    <div className='header-slider-container'>
      <div className='image-brand-title'>
        <img src={brandImg} />
        <div>Todo para tu PC</div>
      </div>
      <h2 className='text-white'>{title}</h2>
      <div className='display-flex justify-center'>
        <div className='slider-container'>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false
            }}
            speed={2000}
            modules={[Autoplay, Navigation, Pagination]}
            navigation={false}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <img
                src={header01}
                alt='Header 01'
                className='swiper-slide-img'
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={header02}
                alt='Header 02'
                className='swiper-slide-img'
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={header03}
                alt='Header 03'
                className='swiper-slide-img'
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={header04}
                alt='Header 04'
                className='swiper-slide-img'
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={header05}
                alt='Header 05'
                className='swiper-slide-img'
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={header06}
                alt='Header 06'
                className='swiper-slide-img'
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default HeaderSlider;
