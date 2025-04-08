import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminReviewPanel() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingCards();
    }, []);

    const fetchPendingCards = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/cards', {
                withCredentials: true,
            });

            // фильтруем только неапрувнутые карточки
            const unapproved = res.data.filter(card => !card.isApproved);
            setCards(unapproved);
        } catch (err) {
            console.error('Ошибка при получении карточек', err);
        } finally {
            setLoading(false);
        }
    };

    const approveCard = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/approve-card/${id}`, {}, {
                withCredentials: true,
            });

            setCards(prev => prev.filter(card => card._id !== id));
        } catch (err) {
            console.error('Ошибка при одобрении карточки', err);
        }
    };

    if (loading) return <div>Загрузка...</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Карточки на проверку</h2>
            {cards.length === 0 ? (
                <p>Нет карточек для проверки.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cards.map(card => (
                        <div key={card._id} className="border p-4 rounded shadow">
                            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                            <p className="mb-2">{card.description}</p>
                            {card.image && (
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="mb-2 w-full h-40 object-cover rounded"
                                />
                            )}
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={() => approveCard(card._id)}
                            >
                                Одобрить
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
