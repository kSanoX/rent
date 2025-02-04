import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            let isMounted = true;
            fetch('http://localhost:5000/api/user', {
                headers: { Authorization: `Bearer ${token}` },
                'Content-Type': 'application/json',
            })
                .then(response => {
                    if (!response.ok) throw new Error('Error fetching user data');
                    return response.json();
                })
                .then(data => {
                    if (isMounted) setUser(data.user);
                })
                .catch(error => console.error('Error fetching user data:', error));
    
            return () => { isMounted = false; };
        }
    }, []);
    

    const login = async (token) => {
        try {
          const response = await fetch('http://localhost:5000/api/user', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
      
          if (response.ok) {
            setUser(data.user);
            localStorage.setItem('token', token);
            fetchUser();
          } else {
            console.error('Failed to fetch user');
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      };

    const logout = () => {
        setUser(null);
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