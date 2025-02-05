import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    if (!user) {
        return <p>Please log in to view your profile.</p>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default ProfilePage;
