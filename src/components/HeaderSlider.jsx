import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

import {
  brandImg,
  header01,
  header01Mobile,
  header02,
  header02Mobile,
  header03,
  header03Mobile,
  header04,
  header04Mobile,
  header05,
  header05Mobile,
  header06,
  header06Mobile
} from '../assets/index.js';
import '../index.css';

function HeaderSlider({ title }) {
  return (
    <div className='header-slider-container'>
      <div className='image-brand-title'>
        <h1 className='head-title'>Market-Tech</h1>
        <div className='head-title'>¡Todo para tu PC!</div>
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
                srcSet={`${header01Mobile} 600w, ${header01} 1024w`}
                sizes='(max-width: 600px) 100vw, 50vw'
                src={header01}
                alt='Header 01'
                className='swiper-slide-img'
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                srcSet={`${header02Mobile} 600w, ${header02} 1024w`}
                sizes='(max-width: 600px) 100vw, 50vw'
                src={header02}
                alt='Header 02'
                className='swiper-slide-img'
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                srcSet={`${header03Mobile} 600w, ${header03} 1024w`}
                sizes='(max-width: 600px) 100vw, 50vw'
                src={header03}
                alt='Header 03'
                className='swiper-slide-img'
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                srcSet={`${header04Mobile} 600w, ${header04} 1024w`}
                sizes='(max-width: 600px) 100vw, 50vw'
                src={header04}
                alt='Header 04'
                className='swiper-slide-img'
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                srcSet={`${header05Mobile} 600w, ${header05} 1024w`}
                sizes='(max-width: 600px) 100vw, 50vw'
                src={header05}
                alt='Header 05'
                className='swiper-slide-img'
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                srcSet={`${header06Mobile} 600w, ${header06} 1024w`}
                sizes='(max-width: 600px) 100vw, 50vw'
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
