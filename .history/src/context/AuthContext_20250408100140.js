import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
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
            setUser(data.user);
        } catch (error) {
            console.error('Error fetching user data:', error);
            localStorage.removeItem('token'); // Удаляем битый токен
            setUser(null);
        } finally {
            setLoading(false); // Завершаем загрузку
        }
    };

    useEffect(() => {
        fetchUser(); // Загружаем данные пользователя при монтировании компонента
    }, []);

    const login = async (token) => {
        try {
            localStorage.setItem('token', token);
            setLoading(true); // Стартуем загрузку
            await fetchUser(); // Загружаем данные пользователя после логина
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
            {!loading && children} {/* Рендерим компоненты только после загрузки */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
