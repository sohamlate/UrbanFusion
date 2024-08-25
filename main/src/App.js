import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Forum from './pages/Forum';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Contact from './pages/Contact';
import EmailEntryPage from './pages/EmailEntryPage';
import axios from 'axios';

export default function App() {

    const [isLoggedIn,setIsLoggedIn] = useState(false); 
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [titems,setTitems] = useState();
    const location = useLocation();
    const [cartItems,setCartItems] = useState([]);
    useEffect(() => { 
      const autoLogin = async () => {
        try {
          const token = localStorage.getItem("token");
     //     console.log(token);
         // commented below part after hiting url like share product it redirect 
          if (!token) {
            console.log("token not");
            navigate("/login"); 
          }
  
          const response = await axios.get(
            "http://localhost:5000/user/autoLogin",
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
        
          if (response.data.success) {
            localStorage.setItem("user", JSON.stringify(response.data.data));
            setUser(response.data.data);
            // socket.emit("login", {
            //   userId: response.data.data._id,
            //   socketId: socket.id,
            // });
      
          } else {
            navigate("/login");
          }
        } catch (error) {
          console.error("Axios request error in app.js:", error);
        }
      };
  
      autoLogin(); 
    }, []);
    
  
    useEffect(() => {
      try {
        if (user && Object.keys(user).length > 0) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch(err) {}
    }, [user]);
  
  console.log("settoiing user",user);

  return (
    <>
      <div className="text-lg">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> {/* Pass isLoggedIn to Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/forums/intra-department" element={<IntraDepartmentalForumPage />} />
          <Route path="/forums/inter-department" element={<InterDepartmentalForumPage />} />
          <Route path="/forums/public" element={<PublicForumPage />} />
          <Route path="/forum" element={<Forum />} />
          <Route 
            path="/login" 
            element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} 
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/otp" element={<EmailEntryPage />} />
        </Routes>
      </div>
    </>
  );
}
