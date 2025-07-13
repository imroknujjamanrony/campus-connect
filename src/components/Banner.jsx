"use client";
import Image from "next/image";
import banner from "../../public/pexels-pixabay-247823.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Banner() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/colleges")
      .then((res) => res.json())
      .then((data) => setColleges(data));
  }, []);

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-[90vh] w-full bg-gray-100">
      {/* Background */}
      <Image
        src={banner}
        alt="Banner"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-green-900/70 z-10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-24 z-20 text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          CampusConnect
        </h2>
        <p className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Achieve Your Dreams. Book your Course.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-2xl bg-white rounded-full shadow-md flex">
          <input
            type="text"
            placeholder="Search colleges..."
            className="flex-grow py-3 px-6 text-gray-700 rounded-l-full focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-red-600 hover:bg-red-700 px-6 py-3 text-white font-semibold rounded-r-full">
            Search
          </button>
        </div>

        {/* All Colleges Button */}
        <div className="mt-6">
          <Link
            href="/colleges"
            className="bg-white text-green-900 px-5 py-2 rounded-full border-2 hover:bg-green-900 hover:text-white transition"
          >
            All Colleges
          </Link>
        </div>
      </div>

      {/* Search Results (Bottom) */}
      {search && (
        <div className="absolute top-full -mt-40 left-1/2 -translate-x-1/2 w-full max-w-4xl z-30 px-4 bg-white shadow-md rounded-md py-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Search Results
          </h2>
          {filteredColleges.length ? (
            <ul className="space-y-3">
              {filteredColleges.map((college) => (
                <li
                  key={college._id}
                  className="flex items-center justify-between border-b border-gray-200 pb-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={college.image}
                      alt={college.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <span className="text-gray-800 font-medium">
                      {college.name}
                    </span>
                  </div>
                  <Link
                    href={`/colleges/${college._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Details
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No colleges found by that name.</p>
          )}
        </div>
      )}
    </div>
  );
}
