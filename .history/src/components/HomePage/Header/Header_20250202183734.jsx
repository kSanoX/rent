import { Link } from "react-router-dom";
import "./header.scss";
import Logo from "./Logo.svg";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function Header() {

    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/" className="logo__link-to-home">
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <div className="header__nav">
                <ul className="nav__menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/properties">Properties</Link></li>
                    {user ? (
                        <li className="nav__user">
                        </li>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </ul>
            </div>
            <div className="header__contact">
                <button className="contact__us-btn">Contact Us</button>
            </div>
        </header>
    );
}

export default Header;
