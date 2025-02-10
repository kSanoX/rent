import { useEffect, useState } from 'react';

const UserProfileCards = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Получаем карточки пользователя при монтировании компонента
    const fetchUserCards = async () => {
      try {
        const response = await fetch('/api/cards/user-cards', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Загружаем токен из localStorage
          }
        });

        const data = await response.json();

        if (data.success) {
          setCards(data.cards);  // Устанавливаем карточки в состояние
        } else {
          setError('Ошибка при получении карточек');
        }
      } catch (err) {
        setError('Ошибка сети');
      }
    };

    fetchUserCards();
  }, []);

  return (
    <div>
      <h1>Мои карточки</h1>
      {error && <p>{error}</p>}
      <div>
        {cards.length > 0 ? (
          cards.map(card => (
            <div key={card._id}>
              <h2>{card.title}</h2>
              <img src={card.image} alt={card.title} />
              <p>{card.description}</p>
              <p>{card.price} грн</p>
            </div>
          ))
        ) : (
          <p>У вас нет карточек</p>
        )}
      </div>
    </div>
  );
};

export default UserProfileCards;
