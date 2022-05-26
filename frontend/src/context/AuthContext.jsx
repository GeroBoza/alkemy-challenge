import React, { useContext, useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
    const [auth, setAuth] = useState(
        localStorage.getItem("jwt-token") || false
    );
    const [userName, setUserName] = useState(
        localStorage.getItem("userName") || ""
    );

    return (
        <AuthContext.Provider value={{ auth, setAuth, userName, setUserName }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
