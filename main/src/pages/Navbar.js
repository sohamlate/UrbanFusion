import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Clear authentication data (e.g., localStorage)
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <a href="/" className="flex items-center">
            <img src={logo} className="w-36" alt="Urban Governance Logo" />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
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
          {isLoggedIn ? (
            <>
              <NavLink
                to="/profile"
                className="text-lg font-semibold hover:text-yellow-300"
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-lg font-semibold hover:text-yellow-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-lg font-semibold hover:text-yellow-300 transition-colors duration-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/otp"
                className="text-lg font-semibold hover:text-yellow-300 transition-colors duration-300"
              >
                <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors duration-300">
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
            {isMenuOpen ? "✖️" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 p-4">
          <NavLink
            to="/"
            className="block text-lg font-semibold text-white hover:text-yellow-300 mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className="block text-lg font-semibold text-white hover:text-yellow-300 mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </NavLink>
          <NavLink
            to="/resources"
            className="block text-lg font-semibold text-white hover:text-yellow-300 mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Resources
          </NavLink>
          <NavLink
            to="/contact"
            className="block text-lg font-semibold text-white hover:text-yellow-300 mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink
                to="/profile"
                className="block text-lg font-semibold text-white hover:text-yellow-300 mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </NavLink>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left px-4 py-2 text-sm text-white hover:text-yellow-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block text-lg font-semibold text-white hover:text-yellow-300 mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/otp"
                className="block text-lg font-semibold text-white hover:text-yellow-300 mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors duration-300">
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
