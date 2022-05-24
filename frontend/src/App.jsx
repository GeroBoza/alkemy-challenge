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
import OperationsForm from "./pages/OperationsForm/OperationsForm";
import Operations from "./pages/Operations/Operations";
import AuthForm from "./pages/Auth/AuthForm";
function App() {
    return (
        <Router>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/auth" element={<AuthForm />}></Route>
                <Route path="/operations" element={<Operations />}></Route>
                <Route
                    path="/operations/new"
                    element={<OperationsForm mode="create" />}
                ></Route>
                <Route
                    path="/operations/edit/:id"
                    element={<OperationsForm mode="edit" />}
                ></Route>
                <Route path="/categories/new" element={<NewCategory />}></Route>
                <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
