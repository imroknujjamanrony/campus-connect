import Link from "next/link";

export default function Navbar() {
  const links = [
    { path: "/", label: "Home" },
    { path: "/colleges", label: "Colleges" },
    { path: "/admission", label: "Admission" },
    { path: "/my-college", label: "My College" },
  ];
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links.map((link) => (
              <Link key={link.path} href={link.path}>
                {link.label}
              </Link>
            ))}
          </ul>
        </div>
        <Link href={"/"} className="btn btn-ghost text-xl">
          CampusConnect
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map((link) => (
            <li key={link.path}>
              <Link href={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="/login" className="btn">
          Login
        </Link>
        <Link href="/register" className="btn btn-primary ml-2">
          Register
        </Link>
      </div>
    </div>
  );
}
