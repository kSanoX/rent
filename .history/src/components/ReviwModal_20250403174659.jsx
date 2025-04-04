import { useState } from "react";
import "../styles/reviewModal.scss";

function ReviewModal({ userId, onClose }) {
    const [rating, setRating] = useState(5);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const reviewData = {
            rating,
            title,
            description,
            country,
            user: userId
        };
    
        // Извлекаем токен из localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found");
            return; // Выход, если токен не найден
        }
    
        try {
            const response = await fetch("http://localhost:5000/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                },
                body: JSON.stringify(reviewData)
            });
    
            if (!response.ok) throw new Error("Failed to submit review");
    
            console.log("Review submitted successfully");
            onClose();
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };
    
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Leave a Review</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Rating:
                        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Title:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>

                    <label>
                        Description:
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </label>

                    <label>
                        Country:
                        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </label>

                    <button type="submit" className="submit-btn">Submit</button>
                    <button type="button" className="close-btn" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
}

export default ReviewModal;
