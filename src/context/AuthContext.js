import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Функция для загрузки данных пользователя
    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token); // Проверка токена
        if (!token) return;
    
        try {
            const response = await fetch('http://localhost:5000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) throw new Error('Error fetching user data');
    
            const data = await response.json();
            console.log('User data fetched:', data); // Проверка данных
            setUser(data.user);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    

    // Запрос данных пользователя при монтировании
    useEffect(() => {
        fetchUser(); // Загружаем пользователя, если есть токен
    }, []);

    // Функция логина
    const login = async (token) => {
        try {
            // Сохраняем токен в localStorage
            localStorage.setItem('token', token);

            // Загружаем данные пользователя
            await fetchUser();
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    // Функция выхода
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null); // Убираем пользователя при выходе
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);