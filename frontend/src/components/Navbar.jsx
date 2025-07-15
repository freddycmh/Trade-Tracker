import React from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="w-full px-4 py-2 bg-slate-800 bg-opacity-90 sticky top-3 shadow lg:px-8 lg:py-3 backdrop-blur-lg backdrop-saturate-150 z-50 rounded-xl">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Left: Logo + Text */}
        <a
          href="#"
          className="flex items-center gap-2 text-white font-semibold"
        >
          <img src="/logo2.png" alt="logo" className="w-8 h-8" />
          <span className="text-lg">Trade Tracker</span>
        </a>

        {/* Right: Add Trade */}

        <ul className="flex items-center gap-4">
          <li>
            <a
              href="#"
              className="flex items-center gap-1 text-white text-base font-medium"
            >
              <Plus className="w-5 h-5" />
              Trade
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
