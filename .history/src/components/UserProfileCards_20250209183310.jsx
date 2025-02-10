import { useEffect, useState } from 'react';

const UserProfileCards = () => {
  const [userCards, setUserCards] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // добавляем индикатор загрузки

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Отправляем токен в запросе:", token);

    if (!token) {
        setError('Токен не найден, пользователь не авторизован');
        setIsLoading(false);
        return;
    }

    console.log("Отправляю запрос на сервер...");
    
    fetch('http://localhost:5000/api/cards', {
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
        setIsLoading(false); // убираем индикатор загрузки
    })
    .catch(err => {
        console.error("Ошибка при запросе:", err);
        setError(`Ошибка при загрузке данных: ${err.message}`);
        setIsLoading(false); // убираем индикатор загрузки
    });
  }, []);

  if (isLoading) {
    return <p>Загрузка...</p>; // отображаем сообщение о загрузке
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <h3>Мои карточки:</h3>
      {userCards.length === 0 ? (
        <p>У вас нет карточек на данный момент.</p> // сообщение, если нет карточек
      ) : (
        <ul>
          {userCards.map(card => (
            <li key={card._id}>
              <h4>{card.title}</h4>
              <p>{card.description}</p>
              <p>Цена: {card.price}</p>
              {/* Можно добавить кнопки для редактирования и удаления */}
              <button>Редактировать</button>
              <button>Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfileCards;
