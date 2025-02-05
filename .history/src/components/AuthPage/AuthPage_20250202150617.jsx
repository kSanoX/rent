import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Состояние для переключения между входом и регистрацией
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin 
                ? 'http://localhost:5000/api/auth/login' 
                : 'http://localhost:5000/api/auth/register';

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (isLogin) {
                    login(username, data.token); // Сохраняем пользователя и токен
                    navigate('/'); // Перенаправляем после входа
                } else {
                    alert('Registration successful! You can now log in.');
                    setIsLogin(true); // Переключаемся на форму логина после успешной регистрации
                }
            } else {
                alert(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: 'blue' }}>
                {isLogin ? 'No account? Register' : 'Already have an account? Log in'}
            </p>
        </div>
    );
};

export default AuthPage;

