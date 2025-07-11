"use client";
import { useEffect, useState } from "react";

export default function AdmissionPage() {
  const [colleges, setColleges] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [formDataList, setFormDataList] = useState({});

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        const initialForms = {};
        data.forEach((c) => {
          initialForms[c.id] = {
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

  const handleSubmit = (e, collegeId) => {
    e.preventDefault();
    alert(`Admission submitted for ${collegeId}`);
    setOpenIndex(null);
  };

  return (
    <div className="min-h-screen px-4 md:px-16 py-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🎓 Admission Form
      </h1>

      <div className="space-y-4">
        {colleges.map((college, index) => (
          <div
            key={college.id}
            className="border border-gray-300 bg-white rounded-lg shadow-md"
          >
            {/* Accordion Header */}
            <div
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="cursor-pointer px-6 py-4 text-lg font-semibold text-gray-800 hover:bg-gray-100 transition"
            >
              {college.name}
            </div>

            {/* Accordion Content */}
            {openIndex === index && (
              <div className="px-6 py-6 bg-white border-t border-gray-200">
                <form
                  onSubmit={(e) => handleSubmit(e, college.id)}
                  className="grid gap-4"
                >
                  <input
                    type="text"
                    name="candidateName"
                    placeholder="Candidate Name"
                    value={formDataList[college.id]?.candidateName || ""}
                    onChange={(e) => handleInputChange(e, college.id)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formDataList[college.id]?.subject || ""}
                    onChange={(e) => handleInputChange(e, college.id)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formDataList[college.id]?.email || ""}
                    onChange={(e) => handleInputChange(e, college.id)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formDataList[college.id]?.phone || ""}
                    onChange={(e) => handleInputChange(e, college.id)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formDataList[college.id]?.address || ""}
                    onChange={(e) => handleInputChange(e, college.id)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    required
                  />
                  <input
                    type="date"
                    name="dob"
                    value={formDataList[college.id]?.dob || ""}
                    onChange={(e) => handleInputChange(e, college.id)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                    required
                  />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => handleInputChange(e, college.id)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
                  />
                  <div className="text-right">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Submit Admission
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
