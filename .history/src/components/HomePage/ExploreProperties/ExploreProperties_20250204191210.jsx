import leftbg from "../../../images/left-bg.png";
import rightbg from "../../../images/right-bg.png";
import "./explore-properties.scss";

function ExploreProperties() {
    return (
        <div className="exp-con">
            <div className="exp-con__for-img">
                <div className="supp-container">
                <img src={leftbg} alt="Left background" />
                <img src={rightbg} alt="Right background" />
                </div>
                <div className="content">
                    <div>
                    <h1>Start Your Real Estate Journey Today</h1>
                    <p>Your dream property is just a click away. Whether you're looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance.</p>
                    </div>
                    <button>Explore Properties</button>
                </div>
            </div>
        </div>
    );
}

export default ExploreProperties;
