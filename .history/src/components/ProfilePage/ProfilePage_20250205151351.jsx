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

  // Состояния для редактируемых полей
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

  // Функция для сохранения данных в базе
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('phone', phone);
      formData.append('message', message);
      if (file) {
        formData.append('avatar', file); // Добавляем файл в FormData
      }
  
      const response = await fetch('http://localhost:5000/api/user/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Убедись, что токен правильный
        },
        body: formData,  // Отправляем FormData
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
            <img src={defaultAvatar} alt="Avatar" />
              <label htmlFor="avatar-upload" className="avatar-upload-button">
                Change Avatar
              </label>
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
                  <label htmlFor="about__you">Message</label>
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
