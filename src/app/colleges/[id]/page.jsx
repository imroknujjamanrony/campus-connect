"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  FaCalendarAlt,
  FaStar,
  FaFutbol,
  FaBookOpen,
  FaBolt,
} from "react-icons/fa";

export default function CollegeDetailsPage({ params }) {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading college details...
      </div>
    );
  }

  const college = colleges.find((c) => c.id === params.id);

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl font-semibold">
        College not found!
      </div>
    );
  }

  return (
    <div className="px-4 md:px-16 py-10 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-72 object-cover"
        />

        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-blue-800">{college.name}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              <FaStar /> Rating: {college.rating}
            </span>
            <span className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              <FaCalendarAlt /> Admission Date: {college.admissionDate}
            </span>
            <span className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
              <FaBookOpen /> Research Papers: {college.researchCount}
            </span>
          </div>

          {/* Admission Process */}
          <div className=" p-5 rounded-lg border border-base-300">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-blue-700">
              <FaCalendarAlt /> Admission Process
            </h2>
            <p className="text-gray-700">{college.admissionProcess}</p>
          </div>

          {/* Events */}
          <div className=" p-5 rounded-lg border border-base-300">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-pink-700">
              <FaBolt /> Events
            </h2>
            <ul className="list-disc ml-5 text-gray-700">
              {college.events.map((event, i) => (
                <li key={i}>{event}</li>
              ))}
            </ul>
          </div>

          {/* Sports */}
          <div className=" p-5 rounded-lg border border-base-300">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-green-700">
              <FaFutbol /> Sports
            </h2>
            <ul className="list-disc ml-5 text-gray-700">
              {college.sports.map((sport, i) => (
                <li key={i}>{sport}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
