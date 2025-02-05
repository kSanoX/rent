// src/context/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username, token) => {
        setUser({ username, token });
        localStorage.setItem('token', token); // Сохраняем токен
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Удаляем токен
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
