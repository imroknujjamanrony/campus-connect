"use client";
import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await axios.post("/api/register", {
        name,
        email,
        password,
      });

      if (res.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Registered Successfully!",
          text: "Welcome to CampusConnect 🎉",
        });
        form.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: res.data?.error || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("❌ Submit error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1740&q=80"
        alt="Background"
        fill
        className="object-cover z-0 "
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0   bg-opacity-60 z-10" />

      {/* Form */}
      <div className="absolute  inset-0 flex items-center justify-center z-20 px-4">
        <div className=" backdrop-blur-3xl bg-opacity-90 p-10 rounded-xl shadow-lg max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-center text-green-700">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
