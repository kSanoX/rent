import { useEffect, useState } from 'react';

const UserProfileCards = () => {
  const [userCards, setUserCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Получаем токен из localStorage или из контекста, где ты хранишь его
    const token = localStorage.getItem('token');

    fetch('/api/cards/user-cards', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // Добавляем токен в заголовки
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUserCards(data.cards);
        } else {
          setError(data.error || 'Ошибка при загрузке карточек');
        }
      })
      .catch(err => setError('Ошибка при загрузке данных'));
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
