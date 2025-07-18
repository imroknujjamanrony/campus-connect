"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    await signIn("credentials", { email, password });
    console.log(email, password);
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <Image
        src={
          "https://images.unsplash.com/photo-1750801321932-3d3e3fcdfdcd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-60 z-10" />

      {/* Form Container */}
      <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
        <div className="backdrop-blur-3xl  bg-opacity-90 p-10 rounded-xl shadow-xl max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-800">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-300" />
            <p className="text-sm text-gray-500">or</p>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
            >
              <FaGoogle className="text-red-500 text-lg" />
              <span>Continue with Google</span>
            </button>
            <button
              onClick={() => signIn("github")}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
            >
              <FaGithub className="text-gray-800 text-lg" />
              <span>Continue with GitHub</span>
            </button>
          </div>

          <p className="text-sm text-gray-600 text-center">
            Don't have an account? yes lets login
            <a href="/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
