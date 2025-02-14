import AbstractDesign from "../images/Abstract Design.png";
import "../App.scss";

function FeaturedTitle({title, text }) {
    return (
        <div className="featured__title">
            <img src={AbstractDesign} alt="" />
            <h1>{title}</h1>
            <div className="title-sup">
                <p>{text}</p>
            </div>
        </div>
    );
}

export default FeaturedTitle;
