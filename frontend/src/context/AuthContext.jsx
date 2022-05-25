import React, { useContext, useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
    const [auth, setAuth] = useState(
        localStorage.getItem("jwt-token") || false
    );
    return (
        // <AuthContext.Provider value={[auth, setAuth]}>
        <AuthContext.Provider value={{ auth, setAuth }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
