"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { imageUpload } from "@/lib/ImageUpload";

export default function AdmissionPage() {
  const [colleges, setColleges] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [formDataList, setFormDataList] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/colleges")
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        const initialForms = {};
        data.forEach((c) => {
          initialForms[c._id] = {
            candidateName: "",
            subject: "",
            email: "",
            phone: "",
            address: "",
            dob: "",
            image: null,
          };
        });
        setFormDataList(initialForms);
      });
  }, []);

  const handleInputChange = (e, id) => {
    const { name, value, files } = e.target;
    setFormDataList((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: name === "image" ? files[0] : value,
      },
    }));
  };

  const handleSubmit = async (e, collegeId, college) => {
    e.preventDefault();
    const form = formDataList[collegeId];

    try {
      setIsLoading(true);

      if (!form.image) {
        alert("Please upload a profile image.");
        setIsLoading(false);
        return;
      }

      const imageURL = await imageUpload(form.image);

      const res = await axios.post("/api/addmission", {
        ...form,
        collegeName: college.name,
        collegeId,
        imageURL,
      });

      if (res.data?.success) {
        alert("✅ Admission submitted successfully!");
        setOpenIndex(null);
      } else {
        alert("⚠️ Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error("🚫 Submission error:", err);
      alert("Something went wrong during submission.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-16 py-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🎓 Admission Form
      </h1>

      <div className="space-y-4">
        {colleges.map((college, index) => (
          <div
            key={college._id}
            className="border border-gray-300 bg-white rounded-lg shadow-md"
          >
            <div
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="cursor-pointer px-6 py-4 text-lg font-semibold text-gray-800 hover:bg-gray-100 transition"
            >
              {college.name}
            </div>

            {openIndex === index && (
              <div className="px-6 py-6 bg-white border-t border-gray-200">
                <form
                  onSubmit={(e) => handleSubmit(e, college._id, college)}
                  className="grid gap-4"
                >
                  <input
                    type="text"
                    name="candidateName"
                    placeholder="Candidate Name"
                    value={formDataList[college._id]?.candidateName || ""}
                    onChange={(e) => handleInputChange(e, college._id)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formDataList[college._id]?.subject || ""}
                    onChange={(e) => handleInputChange(e, college._id)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formDataList[college._id]?.email || ""}
                    onChange={(e) => handleInputChange(e, college._id)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formDataList[college._id]?.phone || ""}
                    onChange={(e) => handleInputChange(e, college._id)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formDataList[college._id]?.address || ""}
                    onChange={(e) => handleInputChange(e, college._id)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    required
                  />
                  <input
                    type="date"
                    name="dob"
                    value={formDataList[college._id]?.dob || ""}
                    onChange={(e) => handleInputChange(e, college._id)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    required
                  />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => handleInputChange(e, college._id)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    required
                  />
                  <div className="text-right">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit Admission"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
