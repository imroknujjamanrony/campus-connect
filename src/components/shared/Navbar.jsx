"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  const links = [
    { path: "/", label: "Home" },
    { path: "/colleges", label: "Colleges" },
    { path: "/admission", label: "Admission" },
    { path: "/my-college", label: "My College" },
    { path: "/profile", label: "My Profile" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Left side: Logo */}
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links.map((link) => (
              <li key={link.path}>
                <Link href={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo */}
        <Link href={"/"} className="btn btn-ghost text-xl">
          <Image src={logo} alt="logo" width={40} height={10} />
          CampusConnect
        </Link>
      </div>

      {/* Center: Navigation links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map((link) => (
            <li key={link.path}>
              <Link href={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: User session or auth buttons */}
      <div className="navbar-end">
        {session?.user ? (
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Welcome,{" "}
              <span className="font-medium text-green-700">
                {session.user.name}
              </span>
            </div>
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="Profile"
                width={35}
                height={35}
                className="rounded-full ring-2 ring-green-500"
              />
            )}
            <button
              onClick={() => signOut()}
              className="btn btn-primary btn-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link href="/login" className="btn btn-sm">
              Login
            </Link>
            <Link href="/register" className="btn btn-primary btn-sm ml-2">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
