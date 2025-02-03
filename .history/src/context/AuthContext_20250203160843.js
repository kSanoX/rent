import React, { createContext, useContext, useState, useEffect } from 'react';

// Создаём контекст для авторизации
const AuthContext = createContext();

// Компонент-поставщик контекста
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Проверяем наличие токена в localStorage и получаем данные о пользователе
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error fetching user data');
                    }
                    return response.json();
                })
                .then(data => {
                    setUser(data.user); // сохраняем данные о пользователе
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    setUser(null); // сбрасываем пользователя, если ошибка
                });
        }
    }, []);

    // Логика логина
    const login = (userData) => {
        setUser(userData); // сохраняем данные пользователя в контексте
        localStorage.setItem('token', userData.token); // сохраняем токен
    };

    // Логика логаута
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для получения данных из контекста
export const useAuth = () => useContext(AuthContext);
