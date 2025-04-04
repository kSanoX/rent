import { useEffect, useState } from 'react';
import './clientsRating.scss';
import star from "../../../images/icons/star.svg";
import defaultAvatar from "./Profile.png"; // Можно добавить аватары пользователей
import FeaturedTitle from '../../FeaturedTitle';
import PageListing from '../../PageListing';

function ClientsRating() {
    const [reviews, setReviews] = useState([]); // Состояние для отзывов
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Загружаем отзывы с сервера
        fetch("http://localhost:5000/api/reviews")
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch reviews");
                return response.json();
            })
            .then(data => {
                setReviews(data); // Предположим, что сервер возвращает список отзывов
                setIsLoading(false);
            })
            .catch(err => {
                setError(`Error: ${err.message}`);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading reviews...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="clients__rating-container">
            <FeaturedTitle
                title={"What Our Clients Say"}
                text={"Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs."}
                showButton={true}
            />

            <div className="clietns__say-container">
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review._id} className="clients__say-item">
                            <div className="stars-rating">
                                {/* Отображаем количество звезд в зависимости от рейтинга */}
                                {[...Array(review.rating)].map((_, index) => (
                                    <img key={index} src={star} alt="star" />
                                ))}
                                {/* Заполняем оставшиеся звезды до 5, если рейтинг меньше 5 */}
                                {[...Array(5 - review.rating)].map((_, index) => (
                                    <img key={index + review.rating} src={star} alt="star" className="empty" />
                                ))}
                            </div>
                            <div className="clients__title">
                                <h2>{review.title}</h2>
                                <p>{review.description}</p>
                            </div>
                            <div className="client__info">
                                <img
                                    src={`${"." + review.avatar}` || defaultAvatar}
                                    alt={review.name}
                                />
                                <h3>{review.name}</h3>
                                <p>{review.country || "No location provided"}</p>
                            </div>
                            <div className='data-info'>
                                <p>{review.createdAt.slice(0, 10)}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews available</p>
                )}
            </div>
        </div>
    );
}

export default ClientsRating;
