"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Lightbox from "react-lightbox-component";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "react-lightbox-component/build/css/index.css";

const graduationPhotos = [
  {
    src: "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg",
    caption: "BD Demo College, EIIN: 123456, Session: 2023-24",
  },
  {
    src: "https://images.pexels.com/photos/1184578/pexels-photo-1184578.jpeg",
    caption: "BD Demo College, EIIN: 123456, Session: 2023-24",
  },
  {
    src: "https://images.pexels.com/photos/819754/pexels-photo-819754.jpeg",
    caption: "BD Demo College, EIIN: 123456, Session: 2023-24",
  },
  {
    src: "https://images.pexels.com/photos/3418586/pexels-photo-3418586.jpeg",
    caption: "BD Demo College, EIIN: 123456, Session: 2023-24",
  },
  {
    src: "https://images.pexels.com/photos/3184648/pexels-photo-3184648.jpeg",
    caption: "BD Demo College, EIIN: 123456, Session: 2023-24",
  },
  {
    src: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg",
    caption: "BD Demo College, EIIN: 123456, Session: 2023-24",
  },
  {
    src: "https://images.pexels.com/photos/3173564/pexels-photo-3173564.jpeg",
    caption: "BD Demo College, EIIN: 123456, Session: 2023-24",
  },
  {
    src: "https://images.pexels.com/photos/3173565/pexels-photo-3173565.jpeg",
    caption: "BD Demo College, EIIN: 123456, Session: 2023-24",
  },
  {
    src: "https://images.pexels.com/photos/267891/pexels-photo-267891.jpeg",
    caption: "BD Demo College, EIIN: 123456, Session: 2023-24",
  },
];

export default function GallerySwiper() {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const lightboxImages = graduationPhotos.map((photo) => ({
    src: photo.src,
    title: photo.caption,
  }));

  return (
    <div className="py-12 px-4 md:px-12 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Graduation Moments Gallery
      </h2>

      <Swiper
        className="mySwiper swiper-h"
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        modules={[Pagination, Autoplay]}
      >
        {Array.from({ length: Math.ceil(graduationPhotos.length / 3) }).map(
          (_, slideIndex) => (
            <SwiperSlide key={slideIndex}>
              <Swiper
                className="mySwiper2 swiper-v h-[500px]"
                direction="vertical"
                spaceBetween={30}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                modules={[Pagination, Autoplay]}
              >
                {graduationPhotos
                  .slice(slideIndex * 3, slideIndex * 3 + 3)
                  .map((photo, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative">
                        <img
                          src={photo.src}
                          alt={`Graduation ${slideIndex * 3 + index}`}
                          className="w-full h-80 object-cover rounded-lg shadow-md cursor-pointer"
                          onClick={() => openLightbox(slideIndex * 3 + index)}
                        />
                        <div className="caption absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 rounded-b-lg">
                          {photo.caption}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </SwiperSlide>
          )
        )}
      </Swiper>

      {isOpen && (
        <Lightbox
          images={lightboxImages}
          startIndex={photoIndex}
          showImageModifiers={false}
          onClose={closeLightbox}
          onPrev={() =>
            setPhotoIndex(
              (photoIndex + graduationPhotos.length - 1) %
                graduationPhotos.length
            )
          }
          onNext={() =>
            setPhotoIndex((photoIndex + 1) % graduationPhotos.length)
          }
        />
      )}
    </div>
  );
}
