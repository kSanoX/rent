import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    if (!user) {
      navigate('/login');
    }

    // Здесь можно добавить запрос на сервер для получения данных профиля
    const fetchProfileData = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/users/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${user.token}`,
            },
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData); // Логируем ошибку от сервера
            alert(errorData.message || 'Failed to load profile data');
          } else {
            const data = await response.json();
            setProfileData(data); // Данные профиля
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while fetching profile data.');
        }
      };

    fetchProfileData();
  }, [user, navigate]);

  const handleLogout = () => {
    logout(); // Логаут
    navigate('/login'); // Перенаправление на страницу логина
  };

  if (!profileData) {
    return <div>Loading profile...</div>; // Пока данные профиля не загружены
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <p><strong>Username:</strong> {profileData.username}</p>
      <p><strong>Email:</strong> {profileData.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
