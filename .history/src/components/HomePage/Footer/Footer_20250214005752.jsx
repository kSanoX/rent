import "./footer.scss"
import emailIcon from "../../../images/icons/email.svg";
import sendIcon from "../../../images/icons/Send.svg";

function Footer ( ) {
    return (
        <footer>
            <div className="logo-mail">
                LOGO
                <div className="email-input__container">
                    <img src={emailIcon} alt="email" />
                    <input type="text" placeholder="Enter Your Email" name="" id="email-input" />
                        <img src={sendIcon} alt="send" />
                </div>
            </div>
            <div className="list__container">
            <div className="home list">
                <ul>
                    <span>Home</span>
                    <li>Hero Section</li>
                    <li>Features</li>
                    <li>Properties</li>
                    <li>Testimonials</li>
                    <li>FAQ’s</li>
                </ul>
            </div>
            <div className="about-as list">
                <ul>
                    <span>About Us</span>
                    <li>Our Story</li>
                    <li>Our Works</li>
                    <li>How It Works</li>
                    <li>Our Team</li>
                    <li>Our Clients</li>
                </ul>
            </div>
            <div className="properties list">
                <ul>
                <span>Properties</span>
                    <li>Portfolio</li>
                    <li>Categories</li>
                </ul>
            </div>
            <div className="services list">
                <ul>
                    <span>Services</span>
                    <li>Valuation Mastery</li>
                    <li>Strategic Marketing</li>
                    <li>Negotiation Wizardry</li>
                    <li>Closing Success</li>
                    <li>Property Management</li>
                </ul>
            </div>
            <div className="contact-us list">
                <ul>
                    <span>Contact Us</span>
                    <li>Contact Form</li>
                    <li>Our Offices</li>
                </ul>
            </div>
            </div>
        </footer>
    )
};

export default Footer;