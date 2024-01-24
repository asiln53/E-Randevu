"use client";
import { useState } from 'react';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";


const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ['/slide1.png', '/slide2.jpg', '/slide3.jpg']; // Resim URL'lerini değiştirin
  const slideTexts = [
  'Haber 1', 
  'Haber 2', 
  'Haber 3'
];
  

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
  <div className="relative overflow-hidden ">
    <div className="relative overflow-hidden ">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`}  
      
      style={{ opacity: 0.8,filter: 'brightness(70%)'}}/>

      {/* Slide metni */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold">
          {slideTexts[currentIndex]}
        </div>

      {/* Sol yönlü buton */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-blue-500 text-center font-bold text-2xl p-3 rounded-full"
        onClick={prevSlide}
      >
        <GrFormPrevious />
      </button>

      {/* Sağ yönlü buton */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-blue-500 text-center font-bold text-2xl p-3 rounded-full"
        onClick={nextSlide}
      >
        <MdNavigateNext />
      </button>

      
      
    </div>
    </div>
  );
};

export default Slider;