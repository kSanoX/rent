import { useEffect, useState } from 'react';
import "../styles/UserProfileCards.scss"
import { useNavigate } from 'react-router-dom';

const UserProfileCards = ({ setApartmentToEdit, openModal }) => {
  const [userCards, setUserCards] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Отправляем токен в запросе:", token);

    if (!token) {
        setError('Токен не найден, пользователь не авторизован');
        setIsLoading(false);
        return;
    }

    console.log("Отправляю запрос на сервер...");
    
    fetch('http://localhost:5000/api/user-cards', { 
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => {
        console.log("Ответ сервера:", response);
        if (!response.ok) {
            throw new Error(`Ошибка при запросе: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Данные от сервера:", data);
        if (data.success) {
            setUserCards(data.cards);
        } else {
            setError(data.error || 'Ошибка при загрузке карточек');
        }
        setIsLoading(false);
    })
    .catch(err => {
        console.error("Ошибка при запросе:", err);
        setError(`Ошибка при загрузке данных: ${err.message}`);
        setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Downloading...</p>;
  }

  const handleEditApartment = (apartment) => {
    setApartmentToEdit(apartment); // передаем данные квартиры в состояние
    openModal(); // открываем модалку
  };

  return (
    <div className='profile-cards-container'>
      {error && <p>{error}</p>}
      {userCards.length === 0 ? (
        <p>У вас нет карточек на данный момент.</p>
      ) : (
        <ul className='profile-cards-list'>
          {userCards.map(card => (
            <li key={card._id} className='profile-cards-item'>
              <h4 style={{fontSize: "24px"}}>Title: <span style={{fontSize:"21px"}}>{card.title}</span></h4>
              <img src={`http://localhost:5000${card.image}`} className='profile-cards-img'></img>
              <p>{card.description}</p>
              <p>Price: {card.price}$</p>
              <div className='profile-cards-buttons-container'>
              <button onClick={() => handleEditClick(card)}>Edit</button>
              <button>Delete</button>
              <button onClick={() => navigate(`/property-details/${card._id}`)}>Details</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfileCards;
