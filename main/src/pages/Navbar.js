import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

const Navbar = ({ isLoggedIn,}) => {

  const [ismenu, setIsmenu] = useState(false);

  return (
    <nav className="border-gray-200 navbar m-2 rounded-md font-poppins bg-blue-500">
      <div className="max-w-screen-xl flex flex-wrap justify-between items-center mx-auto">
        <div className="left-0">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={logo}
              className="w-[13rem]"
              alt="Huehub Logo"
            />
          </a>
        </div>
      
       
        
       
        <div className="w-[50vw] hidden md:flex justify-evenly items-center " id="navbar-default">
          <div className="text-xl text-white font-bold hover:border-b-2 transition-all duration-100 hover:text-yellow-300 border-yellow-300 cursor-pointer">
            <NavLink to="/">Home</NavLink>
          </div>
          <div className="text-xl text-white font-bold hover:border-b-2 transition-all duration-100 hover:text-yellow-300 border-yellow-300 cursor-pointer">
            <NavLink to="/gallery">Gallery</NavLink>
          </div>
          <div className="text-xl text-white font-bold hover:border-b-2 transition-all duration-100 hover:text-yellow-300 border-yellow-300 cursor-pointer">
            <NavLink to="/about">About</NavLink>
          </div>
          <div className="text-xl text-white font-bold hover:border-b-2 transition-all duration-100 hover:text-yellow-300 border-yellow-300 cursor-pointer">
            <NavLink to="/contact">Contact</NavLink>
          </div>
         
         
        </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <div className="text-lg flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse">
            {!isLoggedIn && (
              <div>
                <NavLink to="/login">Login</NavLink>
              </div>
            )}
            {!isLoggedIn && (
              <div>
                <NavLink to="/otp">
                  <button>Sign Up</button>
                </NavLink>
              </div>
            )}
            <div className="flex justify-end items-center gap-x-5"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
