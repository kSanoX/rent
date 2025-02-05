import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      setTimeout(() => {
        setLoading(false);
        if (!user) navigate('/login');
      }, 500); // Даем время на загрузку контекста
    }
  }, [user, navigate]);

  if (loading) return <div>Загрузка...</div>;

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
