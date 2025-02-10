import { useEffect, useState } from 'react';

const UserProfileCards = () => {
  const [userCards, setUserCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      setError('Токен не найден, пользователь не авторизован');
      return;
    }
  
    fetch('/api/cards/user-cards', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // Добавляем токен в заголовки
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка при запросе: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          setUserCards(data.cards);
        } else {
          setError(data.error || 'Ошибка при загрузке карточек');
        }
      })
      .catch(err => {
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
