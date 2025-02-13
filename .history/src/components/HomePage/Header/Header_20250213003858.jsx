import { Link, Navigate } from 'react-router-dom';
import './header.scss';
import Logo from './Logo.svg';
import { useAuth } from '../../../context/AuthContext';
import { useState } from 'react';

function Header() {
    const { user, logout } = useAuth();
    const [redirect, setRedirect] = useState(false); // добавьте состояние для редиректа

    const handleLogout = () => {
        logout();
        setRedirect(true); // устанавливаем редирект в true
    };

    if (redirect) {
        return <Navigate to="/login" />; // перенаправляем на страницу логина
    }

    return (
        <header>
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
                            <Link to="/profile" className="nav__user-link">
                                {user.username}
                            </Link>
                            <button onClick={handleLogout} className="nav__logout-btn">
                                Logout
                            </button>
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
