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

          <div className="profile__info">
            {/* First Name */}
            <fieldset className="happen__fieldset">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  placeholder="Enter First Name"
                  onChange={handleChange}
                />
              </fieldset>

              {/* Last Name */}
              <fieldset className="happen__fieldset">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  placeholder="Enter Last Name"
                  onChange={handleChange}
                />
              </fieldset>

              {/* Email */}
              <fieldset className="happen__fieldset">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your Email"
                  onChange={handleChange}
                />
              </fieldset>

              {/* Phone */}
              <fieldset className="happen__fieldset">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  placeholder="Enter Phone Number"
                  onChange={handleChange}
                />
              </fieldset>
          </div>
          {/* <button onClick={logout}>Logout</button> */}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
