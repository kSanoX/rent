import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Здесь можно добавить запрос на сервер, чтобы получить данные о пользователе
            const decodedUser = { username: 'exampleUser', email: 'user@example.com' }; // Пример
            setUser(decodedUser);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('token', 'your-token-here'); // Сохраняем токен в localStorage
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
