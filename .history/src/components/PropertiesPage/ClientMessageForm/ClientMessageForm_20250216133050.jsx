import React, { useState, useEffect } from "react";
import "./clientMessageForm.scss";

function ClientMessageForm () {
    const [locations, setLocations] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    location: '',
    type: '',
    bathrooms: '',
    bedrooms: '',
    budget: '',
    message: '',
    agree: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:5000/api/filters");
        const data = await response.json();

        const locationsData = data.find(item => item.name === "Locations");
        const propertyTypesData = data.find(item => item.name === "Property Type");

        if (locationsData && propertyTypesData) {
          setLocations(locationsData.options);
          setPropertyTypes(propertyTypesData.options);
        } else {
          setError("Не найдены необходимые данные");
        }
      } catch (err) {
        setError("Ошибка загрузки данных с сервера");
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/messages/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        alert("Message submitted successfully!");
      } else {
        throw new Error("Failed to submit message");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the message.");
    }
  };  

  return (
    <form className="client__message" onSubmit={handleSubmit}>
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

      {/* Preferred Location */}
      <fieldset className="happen__fieldset">
        <label htmlFor="location">Preferred Location</label>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="happen__select"
        >
          <option value="">Select Location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </fieldset>

      {/* Property Type */}
      <fieldset className="happen__fieldset">
        <label htmlFor="type">Property Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="happen__select"
        >
          <option value="">Select Property Type</option>
          {propertyTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </fieldset>

      {/* No. of Bathrooms */}
      <fieldset className="happen__fieldset">
        <label htmlFor="bathrooms">No. of Bathrooms</label>
        <select
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          className="happen__select"
        >
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="2+">2+</option>
        </select>
      </fieldset>

      {/* No. of Bedrooms */}
      <fieldset className="happen__fieldset">
        <label htmlFor="bedrooms">No. of Bedrooms</label>
        <select
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          className="happen__select"
        >
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </fieldset>

      {/* Budget */}
      <fieldset className="happen__fieldset budget">
        <label htmlFor="budget">Budget</label>
        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="happen__budget_select happen__select"
        >
          <option value="">Select</option>
          <option value="200K">200K+</option>
          <option value="500K">500K+</option>
          <option value="1M">1M+</option>
        </select>
      </fieldset>

      {/* Message */}
      <fieldset className="happen__fieldset text">
        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          value={formData.message}
          placeholder="Enter your Message here.."
          rows="4"
          onChange={handleChange}
          className="happen__textarea"
        />
      </fieldset>

      {/* Agree checkbox */}
      <div className="sup-container__for-form">
      <fieldset className="happen__fieldset privacy">
      <label htmlFor="agree" className="happen__agree happen__label">
          I agree with Terms of Use Privacy Policy
        </label>
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleCheckboxChange}
          className="happen__checkbox"
        />
      </fieldset>

      {/* Submit Button */}
      <fieldset className="happen__fieldset">
        <button type="submit" className="happen__submit-btn">
          Send your message
        </button>
      </fieldset>
      </div>
    </form>
  );
}

export default ClientMessageForm;
