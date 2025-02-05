import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false); // Указываем, что загрузка завершена
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, navigate, isLoading]);

  if (isLoading) return <div>Loading...</div>; // Показываем загрузку вместо редиректа

  return (
    <div className='profile__container'>
      <h2>Profile</h2>
      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
