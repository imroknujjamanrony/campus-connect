"use client";

import CollegeCard from "@/components/CollegeCard";
import { useEffect, useState } from "react";

export default function AllCollegesPage() {
  const [colleges, setColleges] = useState([]);
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setColleges(data));
  }, []);
  return (
    <div className="py-10 px-4 md:px-16 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">🎓 All Colleges</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {colleges.map((college) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </div>
    </div>
  );
}
