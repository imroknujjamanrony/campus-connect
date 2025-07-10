"use client";
import { useEffect, useState } from "react";

export default function MyCollegePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/solaimanshadin/bd-academic-data/main/collages.json"
        );
        const colleges = await response.json();
        setData(colleges);
      } catch (error) {
        console.error("Failed to fetch college data:", error);
      }
    };
    getData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bangladesh Colleges</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((college, index) => (
          <li
            key={index}
            className="bg-white shadow-md rounded p-3 hover:bg-gray-100 transition"
          >
            {college}
          </li>
        ))}
      </ul>
    </div>
  );
}
