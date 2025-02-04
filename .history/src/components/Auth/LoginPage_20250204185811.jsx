import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true); // Стейт для переключения между входом и регистрацией

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Login successful:', data);
          // Сохраняем только токен, а не весь объект
          localStorage.setItem('token', token);
          login(data.user);
          navigate('/');
      }
       else {
            const errorData = await response.json();
            console.error(`${isLogin ? 'Login' : 'Registration'} failed:`, errorData.error);
            setError(errorData.error || `${isLogin ? 'Login' : 'Registration'} failed. Please check your credentials.`);
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <span
                    style={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Sign up' : 'Log in'}
                </span>
            </p>
        </div>
    );
};

export default AuthPage;
