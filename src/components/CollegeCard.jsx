"use client";
import { useRouter } from "next/navigation";
import { FaStar, FaBookOpen, FaCalendarAlt } from "react-icons/fa";

export default function CollegeCard({ college }) {
  const router = useRouter();

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition duration-300">
      <figure>
        <img
          src={college.image}
          alt={college.name}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{college.name}</h2>
        <p className="flex items-center gap-2 text-sm text-yellow-600">
          <FaStar /> {college.rating} Rating
        </p>
        <p className="flex items-center gap-2 text-sm text-blue-500">
          <FaCalendarAlt /> Admission: {college.admissionDate}
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-600">
          <FaBookOpen /> Research Papers: {college.researchCount}
        </p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => router.push(`/colleges/${college.id}`)}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
