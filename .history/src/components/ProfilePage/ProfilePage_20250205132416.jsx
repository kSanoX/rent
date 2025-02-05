import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./profile.scss"
import defaultAvatar from "../../images/profile-avatar-default.png"

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
        <div className='downloading__profile'>Downloading...</div>
      ) : (
        <>
        <div className="profile__avatar">
          <img src={defaultAvatar} alt="" />
        </div>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );  
};

export default ProfilePage;
