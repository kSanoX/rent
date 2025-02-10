import { useEffect, useState } from 'react';

const UserProfileCards = () => {
  const [userCards, setUserCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Отправляем токен в запросе:", token);

    if (!token) {
        setError('Токен не найден, пользователь не авторизован');
        return;
    }

    console.log("Отправляю запрос на сервер...");
    
    fetch('http://localhost:5000/api/cards/user-cards', {
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
    })
    .catch(err => {
        console.error("Ошибка при запросе:", err);
        setError(`Ошибка при загрузке данных: ${err.message}`);
    });
}, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <h3>Мои карточки:</h3>
      <ul>
        {userCards.map(card => (
          <li key={card._id}>
            <h4>{card.title}</h4>
            <p>{card.description}</p>
            <p>Цена: {card.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfileCards;
