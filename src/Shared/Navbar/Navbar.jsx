import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogOut = (e) => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="bg-[#008080]">
      <div className="navbar  text-white max-w-[1170px] mx-auto">
        <div className="flex-1">
          <Link to="/" className="text-xl">
            Friend Zone
          </Link>
        </div>
        <div className="flex-none">
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
