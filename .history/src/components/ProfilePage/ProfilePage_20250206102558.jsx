import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./profile.scss";
import defaultAvatar from "../../images/profile-avatar-default.png";
import Header from '../HomePage/Header/Header';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [message, setMessage] = useState(user?.message || "");

  

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    if (user) {
      setLoading(false);
      // Обновляем состояния, если user есть
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhone(user.phone || "");
      setMessage(user.message || "");
    }
  }, [user, navigate]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };
  
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", user._id); // ID текущего пользователя
  
    try {
      const response = await fetch("http://localhost:5000/api/upload-avatar", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (data.success) {
        setUser((prev) => ({ ...prev, avatar: data.avatar }));
      } else {
        console.error("Ошибка загрузки аватара:", data.error);
      }
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };
  
  

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          firstName, 
          lastName, 
          phone, 
          message, 
          avatarUrl: imageUrlFromCloudinary  // Передаем URL изображения
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error updating profile');
      }
  
      const data = await response.json();
      console.log('Profile updated:', data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  


  return (
    <>
      <Header />
      <div className="profile__container">
        {loading ? (
          <div className='downloading__profile'>Downloading...</div>
        ) : (
          <>
              <div className="profile__avatar">
                <input
                  type="file"
                  onChange={handleAvatarChange}
                />
                <button onClick={handleAvatarUpload}>Upload Avatar</button>
              </div>

            <div className="profile__info">
              <div className="right-container">
                {/* Username */}
                <fieldset className="happen__fieldset username__profile">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={user?.username || ""}
                    readOnly
                  />
                </fieldset>

                <fieldset className="happen__fieldset">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter First Name"
                  />
                </fieldset>

                {/* Last Name */}
                <fieldset className="happen__fieldset">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter Last Name"
                  />
                </fieldset>

                {/* Email */}
                <fieldset className="happen__fieldset">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email || ""}
                    placeholder="Enter your Email"
                    readOnly
                  />
                </fieldset>

                {/* Phone */}
                <fieldset className="happen__fieldset">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter Phone Number"
                  />
                </fieldset>

                <fieldset className="happen__fieldset text">
                  <label htmlFor="about__you">About you</label>
                  <textarea
                    name="about__you"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your info here"
                    rows="4"
                    className="happen__textarea"
                  />
                </fieldset>

                <button onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
