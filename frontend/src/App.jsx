import React from "react";

import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import NewCategory from "./pages/NewCategory/NewCategory";
import NewOperation from "./pages/NewOperation/NewOperation";
import Operations from "./pages/Operations/Operations";
function App() {
    return (
        <Router>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/operations" element={<Operations />}></Route>
                <Route
                    path="/operations/new"
                    element={<NewOperation />}
                ></Route>
                <Route path="/categories/new" element={<NewCategory />}></Route>
                <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
