"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="py-12 px-4 md:px-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Student Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <>
          <Swiper
            className="mySwiper"
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{
              clickable: true,
              el: ".review-pagination",
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            modules={[Pagination, Autoplay]}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center h-full min-h-[400px]">
                  <img
                    src={review.image} // default avatar
                    alt={review.candidateName}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {review.candidateName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    College ID: {review.collegeId}
                  </p>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-label={
                          i < review.rating ? "Filled star" : "Empty star"
                        }
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mt-auto">
                    {review.review}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="review-pagination mt-6 flex justify-center"></div>
        </>
      )}

      <style jsx global>{`
        .review-pagination .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background-color: #cbd5e0;
          opacity: 1;
        }
        .review-pagination .swiper-pagination-bullet-active {
          background-color: #4f46e5;
        }
      `}</style>
    </div>
  );
}
