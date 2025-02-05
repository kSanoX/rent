import { Link } from 'react-router-dom';
import './header.scss';
import Logo from './Logo.svg';
import { useAuth } from '../../../context/AuthContext';

function Header() {
    const { user, logout } = useAuth();  // Получаем данные пользователя из контекста

    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/" className="logo__link-to-home">
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <div className="header__nav">
                <ul className="nav__menu">
                    <li><Link to="/">Главная</Link></li>
                    <li><Link to="/about">О нас</Link></li>
                    <li><Link to="/properties">Недвижимость</Link></li>
                    {user ? (
                        <li className="nav__user">
                            <span>{user.username}</span> {/* Отображаем имя пользователя */}
                            <button onClick={logout} className="nav__logout-btn">
                                Выйти
                            </button>
                        </li>
                    ) : (
                        <li><Link to="/login">Войти</Link></li>
                    )}
                </ul>
            </div>
            <div className="header__contact">
                <button className="contact__us-btn">Связаться с нами</button>
            </div>
        </header>
    );
}

export default Header;
