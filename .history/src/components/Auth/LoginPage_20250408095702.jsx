import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import "../../styles/login.scss";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
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
            localStorage.setItem('token', data.token);
            login(data.token); // Обновляем состояние пользователя в контексте
            navigate('/'); // Перенаправляем на главную страницу
        } else {
            const errorData = await response.json();
            console.error('Login failed:', errorData.error);
            setError(errorData.error || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="loginwrapper">
            <div className="login-container">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
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
                    <button type="submit">Login</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p>
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
