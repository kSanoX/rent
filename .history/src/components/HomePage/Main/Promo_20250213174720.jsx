import "./promo.scss";
import radioHome from "./radio-home.png";
import homeBg from "./home-bg.png";
import topRightArrow from "../../../images/icons/top-right-arrow.svg"
import cardImg1 from "./card-home2.png";
import cardImg2 from "./card-home1.png";
import cardImg3 from "./card-home3.png";
import cardImg4 from "./card-home4.png";
import { useNavigate } from "react-router-dom";

function Promo() {
    const navigate = useNavigate();
    return (
        <div className="promo__wrapper">
            <div className="promo__section">
                <div className="promo__left">
                    <div className="promo__title">
                        <h1>Discover Your Dream <br /> Property with Estatein</h1>
                        <p>Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.</p>
                    </div>
                    <div className="promo__buttons">
                        <button className="learn__more-btn">Learn More</button>
                        <button
                        className="browse__properties-btn"
                        onClick={() => navigate(`/properties`)}
                    >
                        Browse Properties
                    </button>
                    </div>
                    <div className="promo_info">
                        <div className="promo_info-card"><h2>200+</h2> <p>Happy Customers</p></div>
                        <div className="promo_info-card"><h2>10k+</h2> <p>Properties For Clients</p></div>
                        <div className="promo_info-card"><h2>16+</h2> <p>Years of Experience</p></div>
                    </div>
                </div>
                <div className="promo__right" style={{ backgroundImage: `url(${homeBg})` }}><img src={radioHome} alt="#" className="radioImage" /></div>
            </div>
            <div className="promo__cards">
                <div className="card__items"><img src={topRightArrow} alt="#" className="top-right-arrow" /><div className="card__item-content"><img src={cardImg1} alt="" /></div><p>Find Your Dream Home</p></div>
                <div className="card__items"><img src={topRightArrow} alt="#" className="top-right-arrow" /><div className="card__item-content"><img src={cardImg2} alt="" /></div><p>Unlock Property Value</p></div>
                <div className="card__items"><img src={topRightArrow} alt="#" className="top-right-arrow" /><div className="card__item-content"><img src={cardImg3} alt="" /></div><p>Effortless Property Management</p></div>
                <div className="card__items"><img src={topRightArrow} alt="#" className="top-right-arrow" /><div className="card__item-content"><img src={cardImg4} alt="" /></div><p>Smart Investments, Informed Decisions</p></div>
            </div>
        </div>
    );
}

export default Promo;
