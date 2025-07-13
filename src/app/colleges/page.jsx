"use client";

import CollegeCard from "@/components/CollegeCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AllCollegesPage() {
  const [colleges, setColleges] = useState([]);
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axios.get("/api/colleges");
        setColleges(res.data); // Update state with fetched data
      } catch (error) {
        console.error("❌ Failed to fetch colleges:", error);
      }
    };

    fetchColleges(); // Call the function
  }, []);
  return (
    <div className="py-10 px-4 md:px-16 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">🎓 All Colleges</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {colleges.map((college) => (
          <CollegeCard key={college._id} college={college} />
        ))}
      </div>
    </div>
  );
}
