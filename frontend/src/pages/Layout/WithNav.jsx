import React from "react";
import NavBar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router";

const WithNav = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default WithNav;
