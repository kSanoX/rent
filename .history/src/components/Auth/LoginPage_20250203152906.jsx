import React, { useState } from 'react';
import { useAuth } from './context/AuthContext'; // Импортируем хук для авторизации
import { useNavigate } from 'react-router-dom'; // Для навигации после логина

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Извлекаем метод login из контекста
    const navigate = useNavigate(); // Для навигации

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Отправка данных на сервер для логина
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                // Логин успешен, сохраняем пользователя и токен
                login(data.user);
                navigate('/profile'); // Перенаправляем на страницу профиля
            } else {
                // Обработка ошибки, если логин не удался
                alert(data.error);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;
