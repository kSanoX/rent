import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../HomePage/Header/Header";
import axios from "axios";
import "./propertyDetailsPage.scss";
import FeaturedTitle from "../../components/FeaturedTitle"
import Footer from "../../components/HomePage/Footer/Footer";

import locationPoint from "../../images/icons/locationPoint.svg";
import area from "../../images/icons/area.svg";
import bathrooms from "../../images/icons/bathroom.svg";
import bedrooms from "../../images/icons/bedroom.svg";
import powerIcon from "../../images/icons/power.svg";
import Questions from "../HomePage/Questions/Questions";

function PropertyDetailsPage() {
  const { _id } = useParams();
  const [apartmentCard, setApartmentCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    title: '',
    message: '',
    agree: false
  });

  useEffect(() => {
    const fetchApartmentCard = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cards/${_id}`);
        setApartmentCard(response.data);
      } catch (err) {
        console.error("Error fetching apartment card", err);
      }
    };

    fetchApartmentCard();
  }, [_id]);

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

  if (!apartmentCard) {
    return <div>Loading...</div>;
  }

  const images = apartmentCard.sliderImages || [];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  const preventDrag = (e) => e.preventDefault();

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
    <div>
      <Header />

      <div className="propDetails-wrapper">
        <div className="card__inline">
          <div>
            <h2>{apartmentCard.title}</h2>
            <div className="card-location">
              <img src={locationPoint} alt="locationpoint" />
              <span>{apartmentCard.Locations}</span>
            </div>
          </div>
          <p>Price: {apartmentCard.price}$</p>
        </div>

        <div className="card__info-container">

          {/* Слайдер */}
          <div className='slider'>
            <div style={{ position: "relative", width: "90%", textAlign: "center" }}>

              {/* Картинка */}
              <img className='slider__img' src={`http://localhost:5000/${images[currentIndex]}`} alt={`Apartment Slide ${currentIndex + 1}`} draggable={false} />

            </div>

            {/* Индикатор */}
            <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
              <button className='slider__left-btn' onClick={handlePrev}> &lt;</button>
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`slider__indicate ${index === currentIndex ? "slider__indicate--active" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
              <button className="slider__right-btn" onClick={handleNext}>  &gt; </button>
            </div>

          </div>
        </div>

        <div className="details">
          <div className="description box">
            <h2>Description</h2>
            <p>Discover your own piece of paradise with the Seaside Serenity Villa. T With an open floor plan, breathtaking ocean views from every room, and direct access to a pristine sandy beach, this property is the epitome of coastal living.</p>
            <div className="params">
              <div><img src={bedrooms} alt="" /> Bedrooms <br /> <span>{apartmentCard.bedroomCount}</span></div>
              <div><img src={bathrooms} alt="" /> Bathrooms <br /> <span>{apartmentCard.bathroomCount}</span></div>
              <div><img src={area} alt="" /> Area <br /> <span>{apartmentCard.propertySize}</span></div>
            </div>
          </div>
          <div className="key__features box">
            <h2>Key Features and Amenities</h2>
            <div className="key-items">
              <div><img src={powerIcon} alt="" /> Expansive oceanfront terrace for outdoor entertaining</div>
              <div><img src={powerIcon} alt="" /> Expansive oceanfront terrace for outdoor entertaining</div>
              <div><img src={powerIcon} alt="" /> Expansive oceanfront terrace for outdoor entertaining</div>
              <div><img src={powerIcon} alt="" /> Expansive oceanfront terrace for outdoor entertaining</div>
              <div><img src={powerIcon} alt="" /> Expansive oceanfront terrace for outdoor entertaining</div>
            </div>
          </div>
        </div>


        <form onSubmit={handleSubmit}>
          <div className="details form">
            <div className="left-container">
              <FeaturedTitle title={"Inquire About Seaside Serenity Villa"} text={"Interested in this property? Fill out the form below, and our real estate experts will get back to you with more details, including scheduling a viewing and answering any questions you may have."} showButton={false}></FeaturedTitle>
            </div>
            <div className="right-container">
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

              <fieldset className="happen__fieldset selected__property">
                <label htmlFor="Selected__Property">Selected Property</label>
                <input
                  type="text"
                  name="Selected__Property"
                  value={apartmentCard.title}
                  placeholder={apartmentCard.title}
                  readOnly
                />
              </fieldset>

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
            </div>
          </div>
        </form>

        <div className="listing__price">
          <FeaturedTitle title={"Comprehensive Pricing Details"} text={"At Estatein, transparency is key. We want you to have a clear understanding of all costs associated with your property investment. Below, we break down the pricing for Seaside Serenity Villa to help you make an informed decision"} showButton={false}></FeaturedTitle>
          <div className="price__calculate">
            <div className="price"> Listing Price <br /> {apartmentCard.Pricing_Range}$</div>
            <div className="calculate">

              <div className="Additional__Fees calculate-border">
                <div className="calculate-item1"><h2>Additional Fees</h2> <button className="learn__more btn">Learn More</button></div>
                <div className="calculate-item"><p>Property Transfer Ta</p> <br />  3,000$ <span>Based on the sale price and local regulations</span></div>
                <div className="calculate-item"><p>Legal Fees</p> <br />  500$ <span>Approximate cost for legal services, including title transfer</span></div>
                <div className="calculate-item"><p>Home Inspection</p> <br />  25,000$ <span>Recommended for due diligence</span></div>
                <div className="calculate-item"><p>Property Insurance</p> <br />  1,200$ <span>Annual cost for comprehensive property insurance</span></div>
                <div className="calculate-item2"><p>Mortgage Fees</p> <br /> Varies <span>If applicable, consult with your lender for specific details</span></div>
              </div>

              <div className="Monthly__Costs calculate-border">
              <div className="calculate-item1"><h2>Monthly Costs</h2> <button className="learn__more btn">Learn More</button></div>
                <div className="calculate-item"><p>Property Taxes</p> <br />  $1,250 <span>Approximate monthly property tax based on the sale price and local rates</span></div>
                <div className="calculate-item2"><p>Homeowners' Association Fee</p> <br />  $300 <span>Monthly fee for common area maintenance and security</span></div>
              </div>

              <div className="Total__Initial__Costs calculate-border">
              <div className="calculate-item1"><h2>Total Initial Costs</h2> <button className="learn__more btn">Learn More</button></div>
                <div className="calculate-item"><p>Listing Price</p> <br />${apartmentCard.Pricing_Range}</div>
                <div className="calculate-item"><p>Additional Fees</p> <br /> $29,700 <span>Property transfer tax, legal fees, inspection, insurance</span></div>
                <div className="calculate-item2"><p>Down Payment</p> <br /> ${apartmentCard.Pricing_Range / 100 * 20}<span>20%</span></div>
                <div className="calculate-item2"><p>Mortgage Amount</p> <br />  $1,000,000 <span>If applicable</span></div>
              </div>

              <div className="Monthly__Expenses calculate-border">
              <div className="calculate-item1"><h2>Monthly Expenses</h2> <button className="learn__more btn">Learn More</button></div>
                <div className="calculate-item"><p>Property Taxes</p> <br />$1,250</div>
                <div className="calculate-item"><p>Homeowners' Association Fee</p> <br /> $300</div>
                <div className="calculate-item2"><p>Mortgage Payment</p> <br /> Varies based on terms and interest rate<span>If applicable</span></div>
                <div className="calculate-item2"><p>Property Insurance</p> <br />  $100 <span>Approximate monthly cost</span></div>
              </div>
              
            </div>
          </div>
        </div>        

        <Questions></Questions>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default PropertyDetailsPage;
