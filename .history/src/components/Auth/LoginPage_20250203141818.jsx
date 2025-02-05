import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Импортируем useNavigate

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Инициализируем useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Отправляю:", { email, password });
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token); // Сохраняем токен в localStorage
            console.log('🔹 Отправляю данные на сервер:', { email, password });
            navigate('/');  // Перенаправляем на главную страницу
        } else {
            setError(data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default LoginPage;
