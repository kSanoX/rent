import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Чтобы избежать лишних рендеров

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return; // Не запрашиваем пользователя, если токена нет
            }

            try {
                const response = await fetch("http://localhost:5000/api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 401) {
                    localStorage.removeItem("token");
                    setUser(null);
                } else if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Ошибка при загрузке пользователя:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {!loading && children} {/* Показываем сайт только после загрузки */}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);