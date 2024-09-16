import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/addFriend">Add Friend</NavLink>
      </li>
      <li>
        <NavLink to="/recommendedFriend">Recommended Friends</NavLink>
      </li>
    </>
  );
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogOut = (e) => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="bg-[#008080]">
      <div className="navbar  text-white max-w-[1170px] mx-auto">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="font-bold text-xl">
            Friend Zone
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {token ? (
            <button onClick={handleLogOut} className="project-btn">
              Log Out
            </button>
          ) : (
            <ul className="flex gap-3 px-1">
              <li>
                <Link className="project-btn" to="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className="project-btn" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
