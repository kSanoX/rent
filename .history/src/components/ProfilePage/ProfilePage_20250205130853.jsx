import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout, setUser } = useAuth(); // Предполагаем, что у useAuth есть setUser
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    if (!user) {
      fetch('/api/user', { // Заменить на твой реальный эндпоинт
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.username) {
            setUser(data); // Устанавливаем пользователя в контекст
          } else {
            navigate('/login'); // Если токен недействителен, отправляем на логин
          }
        })
        .catch(() => navigate('/login'))
        .finally(() => setIsCheckingAuth(false));
    } else {
      setIsCheckingAuth(false);
    }
  }, [user, navigate, setUser]);

  if (isCheckingAuth) return <div>Loading...</div>;

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
