import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo3.png";

const Navbar = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <a href="/" className="flex items-center">
            <img src={logo} className="w-[3rem] md:w-[3rem]" alt="Urban Governance Logo" />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <NavLink
            to="/"
            className="text-lg font-semibold hover:text-yellow-300 transition-colors duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className="text-lg font-semibold hover:text-yellow-300 transition-colors duration-300"
          >
            Projects
          </NavLink>
          <NavLink
            to="/resources"
            className="text-lg font-semibold hover:text-yellow-300 transition-colors duration-300"
          >
            Resources
          </NavLink>
          <NavLink
            to="/contact"
            className="text-lg font-semibold hover:text-yellow-300 transition-colors duration-300"
          >
            Contact
          </NavLink>
        </div>

        {/* Desktop Authentication Links */}
        <div className="hidden md:flex items-center space-x-4">
          {!isLoggedIn && (
            <>
              <NavLink
                to="/login"
                className="text-lg font-semibold hover:text-yellow-300 transition-colors duration-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-lg font-semibold"
              >
                <button className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition-colors duration-300">
                  Sign Up
                </button>
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✖️' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-teal-600 to-blue-700 p-4">
          <NavLink
            to="/"
            className="block text-lg font-semibold text-white hover:text-yellow-300 mb-3"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className="block text-lg font-semibold text-white hover:text-yellow-300 mb-3"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </NavLink>
          <NavLink
            to="/resources"
            className="block text-lg font-semibold text-white hover:text-yellow-300 mb-3"
            onClick={() => setIsMenuOpen(false)}
          >
            Resources
          </NavLink>
          <NavLink
            to="/contact"
            className="block text-lg font-semibold text-white hover:text-yellow-300 mb-3"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
          {!isLoggedIn && (
            <>
              <NavLink
                to="/login"
                className="block text-lg font-semibold text-white hover:text-yellow-300 mb-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block text-lg font-semibold text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <button className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition-colors duration-300">
                  Sign Up
                </button>
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
