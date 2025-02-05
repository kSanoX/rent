import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from './firebase'; // Путь к вашему файлу firebase.js
import { useNavigate } from 'react-router-dom'; // Для редиректа после регистрации

export const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [copyPassword, setCopyPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Для перехода после успешной регистрации

    async function register(e) {
        e.preventDefault();
        if (copyPassword !== password) {
            setError("Passwords didn't match");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password); // Регистрируем пользователя
            navigate('/login'); // Перенаправляем на страницу логина после успешной регистрации
        } catch (error) {
            setError(error.message); // В случае ошибки выводим сообщение
        }
    }

    return (
        <div>
            <h2>Create an account</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Показываем ошибку, если есть */}
            <form onSubmit={register}>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="Email"
                />
                <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    placeholder="Password"
                />
                <input 
                    value={copyPassword} 
                    onChange={(e) => setCopyPassword(e.target.value)} 
                    type="password" 
                    placeholder="Confirm Password"
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default SignUp;
