import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import { MainContext } from '../context/MainContext';
import { brandIcons } from '../assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import popularBrands from '../models/popular.json';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function FooterSlider({ title }) {
  const { handleShowAllProducts } = useContext(ModalContext);
  const { setTextSearched } = useContext(MainContext);

  return (
    <div className='header-slider-container'>
      <h2 className='text-white'>{title}</h2>
      <div
        className='display-flex justify-center align-items-center'
        style={{ minHeight: '300px' }}
      >
        <div className='slider-container'>
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false
            }}
            speed={2000}
            modules={[Autoplay, Navigation, Pagination]}
            navigation={false}
            pagination={{ clickable: true }}
            breakpoints={{
              1200: {
                slidesPerView: 5
              },
              992: {
                slidesPerView: 4
              },
              768: {
                slidesPerView: 3,
                initialSlide: 2
              },
              576: {
                slidesPerView: 2
              },
              320: {
                slidesPerView: 1
              }
            }}
          >
            {popularBrands &&
              popularBrands.length > 0 &&
              popularBrands.map(({ id }) => {
                return (
                  <SwiperSlide key={id}>
                    <div
                      className='display-flex justify-center align-items-center cursor-pointer width-100-percent'
                      onClick={() => {
                        setTextSearched(brandIcons[id].name);
                        handleShowAllProducts();
                      }}
                    >
                      <div className='card-custom-footer'>
                        <img
                          src={brandIcons[id].icon}
                          style={{ width: '120px'}}
                          alt={brandIcons[id].name}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default FooterSlider;
