import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from './firebase';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [copyPassword, setCopyPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function register(e) {
        e.preventDefault();
        if (copyPassword !== password) {
            setError("Passwords didn't match");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <h2>Create an account</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
