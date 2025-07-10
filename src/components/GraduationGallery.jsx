"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const graduationPhotos = [
  "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg",
  "https://images.pexels.com/photos/1184578/pexels-photo-1184578.jpeg",
  "https://images.pexels.com/photos/819754/pexels-photo-819754.jpeg",
  "https://images.pexels.com/photos/3418586/pexels-photo-3418586.jpeg",
  "https://images.pexels.com/photos/3184648/pexels-photo-3184648.jpeg",
  "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg",
];

export default function GallerySwiper() {
  return (
    <div className="py-12 px-4 md:px-12 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Graduation Moments Gallery
      </h2>

      <Swiper
        className="mySwiper swiper-h"
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {/* Group the photos in horizontal groups of 2 each */}
        <SwiperSlide>
          <Swiper
            className="mySwiper2 swiper-v h-[500px]"
            direction="vertical"
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[Pagination]}
          >
            {graduationPhotos.slice(0, 3).map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt={`Graduation ${index}`}
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperSlide>

        <SwiperSlide>
          <Swiper
            className="mySwiper2 swiper-v h-[500px]"
            direction="vertical"
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[Pagination]}
          >
            {graduationPhotos.slice(3, 6).map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt={`Graduation ${index + 3}`}
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
