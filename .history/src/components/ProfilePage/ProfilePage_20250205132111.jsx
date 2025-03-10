import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./profile.scss"

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    if (user) {
      setLoading(false);
    }
  }, [user, navigate]);

  

  return (
    <div className="profile__container">
      {loading ? (
        <div className='downloading'>Downloading...</div>
      ) : (
        <>
          <h2>Profile</h2>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );  
};

export default ProfilePage;
