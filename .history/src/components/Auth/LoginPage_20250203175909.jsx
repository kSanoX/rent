import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,  // Use email here, or 'email' in your backend model
          password: password,
        }),
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        // Store the token and user data
        localStorage.setItem('token', data.token);
        // Redirect to another page if needed
        navigate('/dashboard'); // Example route
      } else {
        console.error('Login failed:', response.statusText);
        setError('Login failed. Please check your credentials.');
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