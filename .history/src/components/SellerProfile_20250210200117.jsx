import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultAvatar from "../../src/images/profile-avatar-default.png";
import "../styles/sellerProfile.scss";
import Header from "./HomePage/Header/Header";

function SellerProfile() {
    const { id } = useParams(); // Получаем ID из URL
    const [user, setUser] = useState(null);
    const [cards, setCards] = useState([]); // Состояние для карточек
    const [isLoading, setIsLoading] = useState(false); // Добавим индикатор загрузки
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true); // Добавляем индикатор загрузки

        // Запрос на получение данных пользователя
        fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) throw new Error(`Ошибка при запросе: ${response.statusText}`);
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    setUser(data.user);
                } else {
                    setError(data.error || 'Ошибка при загрузке профиля');
                }
                setIsLoading(false); // Завершаем загрузку
            })
            .catch(err => {
                setError(`Ошибка при загрузке данных: ${err.message}`);
                setIsLoading(false);
            });

        // Запрос на получение карточек
        fetch('http://localhost:5000/api/user-cards', {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) throw new Error(`Ошибка при запросе: ${response.statusText}`);
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    setCards(data.cards);
                } else {
                    setError(data.error || 'Ошибка при загрузке карточек');
                }
            })
            .catch(err => {
                setError(`Ошибка при загрузке данных: ${err.message}`);
            });
    }, [id]); // Эффект запускается при изменении id

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Header />
            <div className="seller-profile">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <h1>{user.firstName} {user.lastName}</h1>
                        <p>{user.role}</p>
                        <img
                            src={`http://localhost:5000${user.avatar}` || defaultAvatar}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="profile-avatar"
                        />
                    </div>
                </div>
                <div className="profile-details">
                    <div className="about">
                        <h1>About</h1>
                        <p>{user.message || "This seller hasn't provided a bio."}</p>
                    </div>
                    <div className="contact">
                        <h1>Contact</h1>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Twitter: <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer" style={{ color: "blueviolet" }}>@twitter</a></p>
                    </div>
                </div>
                <ul className='profile-cards-list'>
                    {cards.map(card => (
                        <li key={card._id} className='profile-cards-item'>
                            <h4 style={{ fontSize: "24px" }}>Title: <span style={{ fontSize: "21px" }}>{card.title}</span></h4>
                            <img src={`http://localhost:5000${card.image}`} className='profile-cards-img' alt="Card" />
                            <p>{card.description}</p>
                            <p>Price: {card.price}$</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default SellerProfile;
