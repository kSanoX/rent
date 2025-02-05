import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth(); // Получаем пользователя из контекста
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user || !user.token) {
        console.error('User is not logged in or token is missing');
        return; // Если нет пользователя или токена, не выполняем запрос
      }

      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error:', errorData);
          alert(errorData.message || 'Failed to load profile data');
        } else {
          const data = await response.json();
          setProfileData(data); // Записываем данные профиля
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching profile data.');
      }
    };

    fetchProfileData();
  }, [user]); // Включаем `user` в зависимости, чтобы следить за его изменением

  return (
    <div>
      {profileData ? (
        <div>
          <h2>{profileData.username}</h2>
          <p>Email: {profileData.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
