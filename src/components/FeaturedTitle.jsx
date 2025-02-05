import AbstractDesign from "../images/Abstract Design.png";
import "../App.scss";

function FeaturedTitle({ showButton = true, title, text }) {
    return (
        <div className="featured__title">
            <img src={AbstractDesign} alt="" />
            <h1>{title}</h1>
            <div className="title-sup">
                <p>{text}</p>
                {showButton && <button>View All Testimonials</button>}
            </div>
        </div>
    );
}

export default FeaturedTitle;
