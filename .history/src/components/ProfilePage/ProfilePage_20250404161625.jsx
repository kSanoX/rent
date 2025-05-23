import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import "./profile.scss";
import defaultAvatar from "../../images/profile-avatar-default.png";
import UserProfileCards from '../UserProfileCards';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [bedroomCount, setBedroomCount] = useState("");
  const [bathroomCount, setBathroomCount] = useState("");
  const [type, setType] = useState("");
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("");
  const [buildYear, setBuildYear] = useState("");
  const [propertySize, setPropertySize] = useState("");
  const [image, setImage] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);

  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/filters", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("Locations fetched:", data);
        if (data.success) {
          const locationFilter = data.locations.find(
            (filter) => filter.name === "location"
          );
          setLocations(locationFilter?.locationOptions || []);
        } else {
          console.error("Failed to fetch locations:", data.error);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
  
    fetchLocations();
  
    if (!user) return;
  
    setLoading(false);
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setPhone(user.phone || "");
    setMessage(user.message || "");
  }, [user]);
  
  
  

  const handleAddApartment = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Add image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("bedroomCount", bedroomCount);
    formData.append("bathroomCount", bathroomCount);
    formData.append("type", type);
    formData.append("image", image);
    formData.append("buildYear", buildYear);
    formData.append("sqm", propertySize);

    sliderImages.forEach((file, index) => {
      formData.append(`sliderImages`, file);
    });

    try {
      const response = await fetch("http://localhost:5000/api/apartments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert("Apartment posted!");
      } else {
        alert("err: " + data.error);
      }
    } catch (error) {
      console.error("Error request:", error);
    }
  };

  const handleSliderImageUpload = (e) => {
    const newFiles = Array.from(e.target.files).filter(file => file.type.startsWith("image/"));
    setSliderImages((prevImages) => [...prevImages, ...newFiles]);
  };
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Please select a valid image file.");
    }
  };  

  const handleSliderImageRemove = (index) => {
    setSliderImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", user._id);

    try {
      const response = await fetch("http://localhost:5000/api/upload-avatar", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUser((prev) => ({ ...prev, avatar: `${data.avatar}?timestamp=${new Date().getTime()}` }));
      } else {
        console.error("Error for loading avatar:", data.error);
      }
    } catch (error) {
      console.error("err:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
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
        }),
      });

      if (!response.ok) {
        throw new Error('Error updating profile');
      }

      const data = await response.json();
      setUser((prev) => ({ ...prev, firstName, lastName, phone, message }));
      console.log('Profile updated:', data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <div><h1 style={{ textAlign: "center" }}>Your Profile</h1></div>
      <div className="profile__container">
        {loading ? (
          <div className='downloading__profile'>Downloading...</div>
        ) : (
          <>
            <div className="profile__avatar">
              <img src={user?.avatar ? `http://localhost:5000${user.avatar}` : defaultAvatar} alt="Аватар" />
              <label className="custom-file-upload">
                Upload Avatar
                <input type="file" onChange={handleAvatarUpload} />
              </label>
              
            </div>

            <div className="profile__info">
                <div className="right-container">
                  <fieldset className="happen__fieldset username__profile">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={user?.username || ""} readOnly />
                  </fieldset>

                  <fieldset className="happen__fieldset role__profile">
                    <label htmlFor="role">Role</label>
                    <input type="text" name="role" value={user?.role || ""} readOnly />
                  </fieldset>

                  <fieldset className="happen__fieldset">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name" />
                  </fieldset>

                  <fieldset className="happen__fieldset">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name" />
                  </fieldset>

                  <fieldset className="happen__fieldset">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={user?.email || ""} readOnly />
                  </fieldset>

                  <fieldset className="happen__fieldset">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone Number" />
                  </fieldset>

                  <fieldset className="happen__fieldset text">
                    <label htmlFor="about__you">About you</label>
                    <textarea name="about__you" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter your info here" rows="4" className="happen__textarea" />
                  </fieldset>

                  <button onClick={handleSave} className='save__changes btn'>Save Changes</button>
                  {user && (user.role === "admin" || user.role === "seller") ? (
                    <button className="toggle-form-button" onClick={openModal}>
                      Add Apartment
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>

              {/* Apartments Form */}
              {(isModalOpen && (user.role === "admin" || user.role === "seller")) && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <h2 style={{ textAlign: "center" }}>Add apartment</h2>
                    <form onSubmit={handleAddApartment} className='apartment-form'>
                        <input
                          className="form-input"
                          type="text"
                          placeholder="Name"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                        <textarea
                          className="form-textarea"
                          placeholder="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                        <input
                          className="form-input"
                          type="number"
                          placeholder="Price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                        />
                        <input
                          className="form-input"
                          type="number"
                          placeholder="Bedrooms"
                          value={bedroomCount}
                          onChange={(e) => setBedroomCount(e.target.value)}
                          required
                        />
                        <input
                          className="form-input"
                          type="number"
                          placeholder="Bathrooms"
                          value={bathroomCount}
                          onChange={(e) => setBathroomCount(e.target.value)}
                          required
                        />
                        <input
                          className="form-input"
                          type="text"
                          placeholder="Type"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          required
                        />
                        <select value={location} onChange={(e) => setLocation(e.target.value)}>
                          <option value="">-- Select a city --</option>
                          {locations.map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                        <input
                          className="form-input"
                          type="number"
                          placeholder="Building Year"
                          value={buildYear}
                          onChange={(e) => setBuildYear(e.target.value)}
                          required
                        />
                        <input
                          className="form-input sqm"
                          type="text"
                          placeholder="sqm"
                          value={propertySize}
                          onChange={(e) => setPropertySize(e.target.value)}
                          required
                        />

                        <div className="button-box__for-form" style={{ gridColumn: "span 2" }}>
                          <div className="file-container">
                            <label className="custom-file-upload">
                              Select cover image
                              <input className="form-file" type="file" onChange={handleImageUpload} />
                            </label>
                            {image && (
                              <div className="preview-container">
                                <h4>Preview Cover Image:</h4>
                                <img src={URL.createObjectURL(image)} alt="Cover" className="preview-image" />
                                <button onClick={handleImageRemove} className="remove-image-button">
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="file-container">
                            <label className="custom-file-upload">
                              Select file (you can add more 1)
                              <input className="form-file" type="file" multiple onChange={handleSliderImageUpload} />
                            </label>
                            {sliderImages.length > 0 && (
                              <div className="slider-preview">
                                <h4>Preview images for slider:</h4>
                                <div className="slider-images">
                                  {sliderImages.map((file, index) => (
                                    <div key={index} className="slider-image-item">
                                      <img src={URL.createObjectURL(file)} alt={`Slider Image ${index + 1}`} className="preview-image" />
                                      <button onClick={() => handleSliderImageRemove(index)} className="remove-image-button">
                                        Remove
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <button className="submit-button" type="submit" style={{gridColumn: "span 2"}}>
                          Add
                        </button>
                      </form>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <h3 style={{textAlign: 'center', padding: "32px", fontSize: "32px"}}>My Posts</h3>
      <UserProfileCards></UserProfileCards>
    </>
  );
};

export default ProfilePage;
