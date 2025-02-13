import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultAvatar from "../../src/images/profile-avatar-default.png";
import "../styles/sellerProfile.scss";
import Header from "./HomePage/Header/Header";

function SellerProfile() {
    const { id } = useParams(); // Получаем ID из URL
    const [user, setUser] = useState(null);
    const [cards, setCards] = useState([]); // Состояние для карточек
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true); // Добавим индикатор загрузки
    
        fetch('http://localhost:5000/api/user-cards', { 
          method: 'GET',
        })
        .then(response => {
          if (!response.ok) throw new Error(`Ошибка при запросе: ${response.statusText}`);
          return response.json();
        })
        .then(data => {
          if (data.success) {
            setUserCards(data.cards);
          } else {
            setError(data.error || 'Ошибка при загрузке карточек');
          }
          setIsLoading(false); // Завершаем загрузку
        })
        .catch(err => {
          setError(`Ошибка при загрузке данных: ${err.message}`);
          setIsLoading(false);
        });
    }, []); // Убираем зависимость от токена, теперь он не нужен

    if (!user) return <p>Loading profile...</p>;
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
                <div className="profile-cards">
                    {cards.length === 0 ? (
                        <p>This seller has no properties listed.</p>
                    ) : (
                        <div className="profile-cards-list">
                            {cards.map(card => (
                                <div key={card._id} className="profile-card-item">
                                    <h4>{card.title}</h4>
                                    <img src={`http://localhost:5000${card.image}`} alt={card.title} className="profile-card-image" />
                                    <p>{card.description}</p>
                                    <p>Price: {card.price}$</p>
                                    <button onClick={() => navigate(`/property-details/${card._id}`)}>View Details</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default SellerProfile;
