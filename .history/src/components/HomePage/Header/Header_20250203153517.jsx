import { Link } from 'react-router-dom';
import './header.scss';
import Logo from './Logo.svg';
import { useAuth } from '../../../context/AuthContext'; // импортируем хук useAuth
import { useEffect } from 'react';

function Header() {
    const { user, logout } = useAuth(); // извлекаем данные о пользователе

    // Если нет данных о пользователе, показываем загрузку
    if (user === null) {
        return <div>Loading...</div>;
    }

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
                        <>
                            <span>Welcome, {user.username || 'User'}</span> {/* Отображаем ник пользователя */}
                            <button onClick={logout}>Logout</button>
                            <Link to="/profile">Profile</Link>
                        </>
                    ) : (
                        <Link to="/login">Login</Link>
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
