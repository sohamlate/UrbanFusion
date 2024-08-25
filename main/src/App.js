import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Forum from './pages/Forum';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';

export default function App() {
  return (
    <>
   
      <div className="text-lg">
        <Navbar isLoggedIn={false} /> {/* Pass isLoggedIn as needed */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      </>
  );
}
