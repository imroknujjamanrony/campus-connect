"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaStar, FaBookOpen, FaCalendarAlt } from "react-icons/fa";

export default function FeaturedCollege() {
  const [featuredColleges, setFeaturedColleges] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFeaturedColleges = async () => {
      try {
        const res = await axios.get("/api/colleges");
        setFeaturedColleges(res.data.slice(0, 3)); // show only 3
      } catch (error) {
        console.error("❌ Failed to fetch colleges:", error);
      }
    };

    fetchFeaturedColleges();
  }, []);

  return (
    <div className="py-12 px-4 md:px-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
        🌟 Featured Colleges
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {featuredColleges.map((college) => (
          <div
            key={college._id}
            className="relative p-4 rounded-2xl bg-white/70 shadow-lg backdrop-blur-md border border-gray-200 hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="flex justify-center">
              <img
                src={college.image}
                alt={college.name}
                className="h-40 w-40 object-cover rounded-full ring-4 ring-green-500 shadow-md -mt-12"
              />
            </div>

            {/* Info */}
            <div className="mt-6 text-center space-y-2">
              <h2 className="text-xl font-bold text-gray-800">
                {college.name}
              </h2>

              <p className="text-sm text-yellow-600 flex items-center justify-center gap-2">
                <FaStar /> {college.rating} Rating
              </p>
              <p className="text-sm text-blue-600 flex items-center justify-center gap-2">
                <FaCalendarAlt /> Admission: {college.admissionDate}
              </p>
              <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                <FaBookOpen /> Research Papers: {college.researchCount}
              </p>
            </div>

            {/* Button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => router.push(`/colleges/${college._id}`)}
                className="inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-semibold px-6 py-2 rounded-full hover:scale-105 transition transform"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
