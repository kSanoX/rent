import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token);
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Error fetching user data');

            const data = await response.json();
            console.log('User data fetched:', data);
            setUser(data.user);
        } catch (error) {
            console.error('Error fetching user data:', error);
            localStorage.removeItem('token'); // очистим битый токен
            setUser(null);
        } finally {
            setLoading(false); // ← очень важно
        }
    };

    useEffect(() => {
        fetchUser(); 
    }, []);

    const login = async (token) => {
        try {
            localStorage.setItem('token', token);
            setLoading(true);
            await fetchUser();
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem('token');
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };    

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
