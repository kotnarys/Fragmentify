import 'swiper/scss';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  EffectCards,
  EffectCoverflow,
  Pagination,
} from 'swiper';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import s from './slider.module.scss';

export default function ImageSlider() {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth]);
  const desktopCarousel = {
    effect: "coverflow",
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    modules: [EffectCoverflow, Pagination],
    slidesPerView: 3,
    parallax: true,
  };
  const mobileCarousel = {
    effect: "cards",
    cardsEffect: {
      slideShadows: false,
    },
    modules: [EffectCards],
  };
  console.log(windowWidth);
  if (windowWidth) {
    return windowWidth < 1280 ? (
      <Swiper {...mobileCarousel} className={s.container}>
        <SwiperSlide>
          <div className={s.box}>
            <img src="/NFT_2.jpg" alt="img1" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={s.box}>
            <img src="/NFT_3.jpg" alt="img3" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={s.box}>
            <img src="/NFT_4.jpg" alt="img4" />
          </div>
        </SwiperSlide>
        //Дополнительные фото в карусель
        <SwiperSlide>
          <div className={s.box}>
            <img src="/cat_nft.png" alt="img2" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={s.box}>
            <img src="/fox.jpg" alt="img1" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={s.box}>
            <img src="/monke.png" alt="img3" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={s.box}>
            <img src="/whales.png" alt="img4" />
          </div>
        </SwiperSlide>
      </Swiper>
    ) : (
      <Swiper {...desktopCarousel} className={s.container}>
        <SwiperSlide>
          <div className={s.box}>
            <img src="/NFT_4.jpg" alt="img4" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={s.box}>
            <img src="/NFT_2.jpg" alt="img2" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={s.box}>
            <img src="/NFT_3.jpg" alt="img3" />
          </div>
        </SwiperSlide>
        //Дополнительные фото в карусель
        <SwiperSlide>
          <div className={s.box}>
            <img src="/cat_nft.png" alt="img2" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={s.box}>
            <img src="/fox.jpg" alt="img1" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={s.box}>
            <img src="/monke.png" alt="img3" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={s.box}>
            <img src="/whales.png" alt="img4" />
          </div>
        </SwiperSlide>
      </Swiper>
    );
  }
}
