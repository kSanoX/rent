import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Попытка восстановить user
    if (!user && !storedUser) {
      navigate('/login');
    }
    setIsCheckingAuth(false);
  }, [user, navigate]);

  if (isCheckingAuth) return <div>Loading...</div>; // Пока проверяем авторизацию — показываем загрузку

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
