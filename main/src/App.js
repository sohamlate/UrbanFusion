import Navbar from "./pages/Navbar"
import Home from "./pages/Home"
import { Router, Routes , Route} from "react-router-dom"
import {Login} from "./pages/Login"


export default function App() {
  return (
    <div className="text-lg">
      <Navbar></Navbar>
      <Routes>
        <Route path= "/" element={<Home></Home>} />
        <Route path= "/login" element={<Login></Login>}/>
      </Routes>
    </div>
  )
}