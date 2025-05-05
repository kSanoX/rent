import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/adminReviewPanel.scss';

export default function AdminReviewPanel() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPendingCards();
    }, []);

    const fetchPendingCards = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/admin/cards', {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            const unapproved = res.data.filter(card => !card.isApproved);
            setCards(unapproved);
        } catch (err) {
            // Handle error if needed
        } finally {
            setLoading(false);
        }
    };

    const approveCard = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/approve-card/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setCards(prev => prev.filter(card => card._id !== id));
        } catch (err) {
            // Handle error if needed
        }
    };

    const rejectCard = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/delete-card/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setCards(prev => prev.filter(card => card._id !== id));
        } catch (err) {
            console.error('Error deleting card', err);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-review-panel">
            <h2>Cards for Review</h2>
            {cards.length === 0 ? (
                <p className="no-cards">No cards to review.</p>
            ) : (
                <div className="cards-grid">
                    {cards.map(card => (
                        <div key={card._id} className="card">
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                            {card.image && (
                                <img src={`http://localhost:5000${card.image}`} alt={card.title} />
                            )}
                            <button className="details-btn" onClick={() => navigate(`/property-details/${card._id}`)}>
                                View Details
                            </button>
                            <div className="actions">
                                <button className="approve-btn" onClick={() => approveCard(card._id)}>
                                    Approve
                                </button>
                                <button className="reject-btn" onClick={() => rejectCard(card._id)}>
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
