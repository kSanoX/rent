import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/register.scss";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }
            alert('Регистрация успешна! Теперь войдите в аккаунт.');
            navigate('/login'); // Перенаправляем на страницу входа
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="registerwrapper">
            <div className="register-container">
                <h2>Регистрация</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form className="register-form" onSubmit={handleSubmit}>
                    <label>
                        Имя пользователя:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Пароль:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
