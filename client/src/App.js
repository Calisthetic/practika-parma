import React from 'react';
//import s from "./AddBlock.module.css";
import './styles/global.css'
import Home from './pages/home';
import UserProfile from "./pages/user-profile"
import Auth from './pages/authorisation';
import TestPass from './pages/test-pass';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {


  

  return (
    <div className="Box">
      {/* <Home></Home> */}
      {/* <UserProfile UserId={2}/> */} 
      <Router>
          {/* <nav>
            <ul>
              <li>
                <Link to="/">xc</Link>
              </li>
              <li>
                <Link to="/home">ccc</Link>
              </li>
            </ul>
          </nav> */}
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path="/auth" element={<Auth/>}></Route>
            <Route path='/user' element={<UserProfile/>}></Route>
            <Route path='/test' element={<TestPass/>}></Route>
          </Routes>
      </Router>
    </div> 
    
  );
}

export default App;
