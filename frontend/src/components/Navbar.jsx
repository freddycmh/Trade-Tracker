// src/components/Navbar.jsx
import React from "react";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  console.log("Navbar DEBUG:", { isAuthenticated, user, hasEmail: user?.email });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full px-4 py-2 bg-slate-800 bg-opacity-90 sticky top-3 shadow lg:px-8 lg:py-3 backdrop-blur-lg backdrop-saturate-150 z-50 rounded-xl">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Left: Logo + Text */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-semibold"
        >
          <img src="/logo2.png" alt="logo" className="w-8 h-8" />
          <span className="text-lg">Trade Tracker</span>
        </Link>

        {/* Right: Buttons */}
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <Link
              to="/create"
              className="flex items-center gap-1 text-white text-base font-medium"
            >
              <Plus className="w-5 h-5" />
              Trade
            </Link>
          )}

          {isAuthenticated && user?.email && (
            <span className="text-slate-300 text-base font-medium">
              {user.email}
            </span>
          )}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-white text-base font-medium"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-white text-base font-medium">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
