import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import defaultAvatar from "../../src/images/profile-avatar-default.png";
import "../styles/sellerProfile.scss";
import Header from "./HomePage/Header/Header";
import UserProfileCards from "./UserProfileCards";

function SellerProfile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            console.error("❌ Ошибка: ID пользователя отсутствует в URL");
            setError("Ошибка: ID пользователя отсутствует");
            return;
        }

        console.log("📡 Запрашиваем профиль пользователя с ID:", id);
        setIsLoading(true);

        fetch(`http://localhost:5000/api/users/${id}`)
            .then(response => {
                console.log("📩 Ответ сервера (профиль пользователя):", response);
                if (!response.ok) throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
                return response.json();
            })
            .then(data => {
                console.log("✅ Получены данные пользователя:", data);
                setUser(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("❌ Ошибка загрузки профиля:", err);
                setError(`Ошибка при загрузке профиля: ${err.message}`);
                setIsLoading(false);
            });

        // Запрос карточек
        fetch(`http://localhost:5000/api/user-cards/${id}`)
            .then(response => {
                console.log("📩 Ответ сервера (карточки):", response);
                if (!response.ok) throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
                return response.json();
            })
            .then(data => {
                console.log("✅ Получены карточки пользователя:", data);
                setCards(data.cards || []);  // Проверка наличия cards
            })
            .catch(err => {
                console.error("❌ Ошибка загрузки карточек:", err);
                setError(`Ошибка загрузки карточек: ${err.message}`);
            });
    }, [id]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!user) return <p>Пользователь не найден или данные загружаются...</p>;

    return (
        <>
            <Header />
            <div className="seller-profile">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <h1>{user.firstName} {user.lastName}</h1>
                        <p>{user.role}</p>
                        <img
                            src={user.avatar ? `http://localhost:5000${user.avatar}` : defaultAvatar}
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
                        <p>Email: {user.email || "Не указан"}</p>
                        <p>Phone: {user.phone || "Не указан"}</p>
                    </div>
                </div>
                {cards.length > 0 ? (
                    <ul className='profile-cards-list'>
                        {cards.map(card => (
                            <li key={card._id} className='profile-cards-item'>
                                <h4>Title: {card.title}</h4>
                                <img src={`http://localhost:5000${card.image}`} className='profile-cards-img' alt="Card" />
                                <p>{card.description}</p>
                                <p>Price: {card.price}$</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>У пользователя нет карточек.</p>  // Альтернативное сообщение, если карточки пусты
                )}
            </div>
        </>
    );
}

export default SellerProfile;
