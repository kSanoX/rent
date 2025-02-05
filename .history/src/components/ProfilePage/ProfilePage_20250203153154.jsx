import React from 'react';
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
    const { user } = useAuth(); // Получаем данные о пользователе

    return (
        <div>
            <h1>Profile</h1>
            {user ? (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    {/* Другие данные пользователя */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProfilePage;
