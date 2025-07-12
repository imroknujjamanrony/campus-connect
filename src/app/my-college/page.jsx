"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function MyCollegePage() {
  const [admissions, setAdmissions] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const res = await axios.get("/api/admission"); // ✅ corrected spelling
        setAdmissions(res.data);
      } catch (err) {
        console.error("Failed to fetch admissions:", err);
      }
    };

    fetchAdmissions();
  }, []);

  const handleReviewSubmit = async (admission) => {
    if (!reviewText || rating === 0) {
      alert("⚠️ Please add both review and rating.");
      return;
    }

    try {
      const res = await axios.post("/api/reviews", {
        collegeId: admission.collegeId,
        candidateName: admission.candidateName,
        review: reviewText,
        rating,
        createdAt: new Date(),
      });

      if (res.data.success) {
        alert("✅ Review submitted!");
        setReviewText("");
        setRating(0);
      }
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("❌ Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-16 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        🎓 My College Admissions
      </h1>

      {admissions.length === 0 ? (
        <p className="text-center text-gray-500">No admission records found.</p>
      ) : (
        <div className="grid gap-8">
          {admissions.map((admission, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
            >
              {/* College Info */}
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
                📘 College ID: {admission.collegeId}
              </h2>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">👤 Name:</span>{" "}
                  {admission.candidateName}
                </p>
                <p>
                  <span className="font-medium">📚 Subject:</span>{" "}
                  {admission.subject}
                </p>
                <p>
                  <span className="font-medium">✉️ Email:</span>{" "}
                  {admission.email}
                </p>
                <p>
                  <span className="font-medium">📞 Phone:</span>{" "}
                  {admission.phone}
                </p>
                <p>
                  <span className="font-medium">🎂 DOB:</span> {admission.dob}
                </p>
                <p>
                  <span className="font-medium">🏠 Address:</span>{" "}
                  {admission.address}
                </p>
              </div>

              {/* Candidate Image */}
              {admission.imageURL && (
                <img
                  src={admission.imageURL}
                  alt="Candidate"
                  className="w-36 h-36 object-cover rounded-md mt-4 border"
                />
              )}

              {/* Review Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  ✍️ Write a Review
                </h3>
                <textarea
                  rows={3}
                  placeholder="Your review..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full text-black border border-gray-300 rounded-md p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                ></textarea>

                <div className="flex items-center justify-between">
                  <Rating
                    value={rating}
                    onChange={setRating}
                    style={{ maxWidth: 140 }}
                  />
                  <button
                    onClick={() => handleReviewSubmit(admission)}
                    className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
