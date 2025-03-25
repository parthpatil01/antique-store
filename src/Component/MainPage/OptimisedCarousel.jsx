import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../Assets/img_1.jpg';
import img2 from '../Assets/img_2.jpg';
import img3 from '../Assets/img_3.jpg';

const OptimizedCarousel = () => {
  const slides = [
    {
      id: 1,
      image: img1,
      title: 'Art and craft as old as civilization',
    },
    {
      id: 2,
      image: img2,
      title: 'Stories of monks and kings',
    },
    {
      id: 3,
      image: img3,
      title: 'Five thousand years of unbroken legacy',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    cssEase: 'linear',
    lazyLoad: 'ondemand',
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={slide.id === 1 ? 'eager' : 'lazy'}
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <div className="absolute inset-x-[15%] inset-y-[42%] text-center text-white">
              <h5 className="text-2xl md:text-3xl font-medium text-font">{slide.title}</h5>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OptimizedCarousel;