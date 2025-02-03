import React, { createContext, useContext, useState, useEffect } from "react";
const jwt = require('jsonwebtoken');

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Можно запросить данные пользователя с сервера или из токена
            const decodedUser = jwtDecode(token); // Если используешь JWT
            setUser({ username: decodedUser.username, email: decodedUser.email });
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
