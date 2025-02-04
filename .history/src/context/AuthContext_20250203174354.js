import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

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

    const login = async (token) => {
        try {
          const response = await fetch('/api/user', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
      
          if (response.ok) {
            setUser(data.user);
            localStorage.setItem('token', token);
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      };

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

export const useAuth = () => useContext(AuthContext);