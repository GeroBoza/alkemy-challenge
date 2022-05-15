import React from "react";


import {
    BrowserRouter as Router,
    // Navigate,
    Route,
    Routes
} from "react-router-dom"
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
function App() {
  return (
    <Router>
        <Navbar></Navbar>
        <Routes>
            
            <Route path="/" element={<Home />}></Route>
        </Routes>
    </Router>
  );
}

export default App;
