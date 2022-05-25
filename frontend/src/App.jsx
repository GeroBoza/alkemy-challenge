import React, { useContext } from "react";

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
// import { AuthProvider } from "./context/AuthContext";
import { AuthContext, useAuth } from "./context/AuthContext";
import WithNav from "./pages/Layout/WithNav";
import WithoutNav from "./pages/Layout/WithoutNav";

function App() {
    const [auth, setAuth] = useContext(AuthContext);
    // const { auth } = useAuth();
    // console.log(auth);
    return (
        <Router>
            {/* <Navbar></Navbar> */}

            {/* {!auth ? <Navigate to="/auth"></Navigate> : ""} */}
            <Routes>
                <Route
                    element={
                        auth ? <WithNav /> : <Navigate to="/auth"></Navigate>
                    }
                >
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/operations" element={<Operations />}></Route>
                    <Route
                        path="/operations/new"
                        element={<OperationsForm mode="create" />}
                    ></Route>
                    <Route
                        path="/operations/edit/:id"
                        element={<OperationsForm mode="edit" />}
                    ></Route>
                    <Route
                        path="/categories/new"
                        element={<NewCategory />}
                    ></Route>
                    <Route
                        path="*"
                        element={<Navigate to="/"></Navigate>}
                    ></Route>
                </Route>
                <Route element={<WithoutNav />}>
                    <Route path="/auth" element={<AuthForm />}></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
