import { useEffect, useState } from 'react';
import "../styles/UserProfileCards.scss";
import { useNavigate } from 'react-router-dom';

const UserProfileCards = () => {
  const [userCards, setUserCards] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authorized');
      setIsLoading(false);
      return;
    }

    fetch('http://localhost:5000/api/my-cards', { 
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    })
    .then(response => {
      if (!response.ok);
      return response.json();
    })
    .then(data => {
      if (data.success) {
        setUserCards(data.cards);
      } else {
        setError(data.error);
      }
      setIsLoading(false);
    })
    .catch(err => {
      setError(`${err.message}`);
      setIsLoading(false);
    });
  }, []);

  const confirmDelete = (id) => {
    setSelectedCardId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedCardId) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/my-cards/${selectedCardId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to delete');
      setUserCards(prevCards => prevCards.filter(card => card._id !== selectedCardId));
      setShowModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) return <p>Downloading...</p>;

  return (
    <div className='profile-cards-container'>
      {error && <p>{error}</p>}
      {userCards.length === 0 ? (
      ) : (
        <ul className='profile-cards-list'>
          {userCards.map(card => (
            <li key={card._id} className='profile-cards-item'>
              <h4 style={{ fontSize: "24px" }}>Title: <span style={{ fontSize: "21px" }}>{card.title}</span></h4>
              <img src={`http://localhost:5000${card.image}`} className='profile-cards-img' alt="Card" />
              <p>{card.description}</p>
              <p>Price: {card.price}$</p>
              <div className='profile-cards-buttons-container'>
                <button onClick={() => confirmDelete(card._id)}>Delete</button>
                <button onClick={() => navigate(`/property-details/${card._id}`)}>Details</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <p>Are you sure you want to delete this card?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileCards;
