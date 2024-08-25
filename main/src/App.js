import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Forum from './pages/Forum';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Contact from './pages/Contact';
import SchedulingPage from './pages/schedule';
import TrainingPage from './pages/TrainingPage';
import IntraDepartmentalForumPage from './pages/IntraDepartmentalForumPage';
import InterDepartmentalForumPage from './pages/InterDepartmentalForumPage';
import PublicForumPage from './pages/PublicForumPage';
import DiscussionPageinter from './pages/fakediscussioninter';
import AnnouncementForm from './pages/AnnouncementForm';
import ResourcesPage from './pages/resources';


export default function App() {
  return (
    
      <div className="text-lg">
        <Navbar isLoggedIn={false} /> {/* Pass isLoggedIn as needed */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/forums/intra-department" element={<IntraDepartmentalForumPage />} />
          <Route path="/forums/inter-department" element={<InterDepartmentalForumPage />} />
          <Route path="/forums/public" element={<PublicForumPage />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/scheduling" element={<SchedulingPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/discussion/:id" element={<DiscussionPageinter />} />
          <Route path="/announcement" element={<AnnouncementForm />} /> {/* Add route for AnnouncementForm */}
          <Route path="/resources" element={<ResourcesPage />} />

        </Routes>
      </div>
    
  );
}
