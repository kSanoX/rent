import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Функция для загрузки данных пользователя
    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch('http://localhost:5000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // Перенес в headers
                },
            });

            if (!response.ok) throw new Error('Error fetching user data');

            const data = await response.json();
            setUser(data.user);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Запрос данных пользователя при монтировании
    useEffect(() => {
        fetchUser();
    }, []);

    // Функция логина
    const login = async (token) => {
        localStorage.setItem('token', token);
        await fetchUser(); // Загружаем данные пользователя после логина
    };

    // Функция выхода
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
