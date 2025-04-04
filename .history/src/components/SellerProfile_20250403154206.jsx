import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import defaultAvatar from "../../src/images/profile-avatar-default.png";
import "../styles/sellerProfile.scss";

function SellerProfile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        }

        console.log(" Request profle user with ID:", id);
        setIsLoading(true);

        fetch(`http://localhost:5000/api/users/${id}`)
            .then(response => {
                if (!response.ok) throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
                return response.json();
            })
            .then(data => {
                console.log("Response data prifle:", data);
                setUser(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(" Error loading profile:", err);
                setError(`Error loading profile: ${err.message}`);
                setIsLoading(false);
            });

        fetch(`http://localhost:5000/api/user-cards/${id}`)
            .then(response => {
                console.log("cards:", response);
                if (!response.ok) throw new Error(`error: ${response.status} ${response.statusText}`);
                return response.json();
            })
            .then(data => {
                setCards(data.cards || []);
            })
            .catch(err => {
                setError(`error loading cards: ${err.message}`);
            });
    }, [id]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!user) return <p>User not found, and loading...</p>;

    return (
        <>
            <div className="seller-profile">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <h1>{user.firstName} {user.lastName}</h1>
                        <p>{user.role}</p>
                        <img
                            src={user.avatar ? `http://localhost:5000${user.avatar}` : defaultAvatar}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="profile-avatar"
                        />
                    </div>
                    <div className="leave_rating" style={{ marginTop: "20px" }}>
                        <button>Leave a rating</button>
                    </div>
                </div>
                <div className="profile-details">
                    <div className="about">
                        <h1>About</h1>
                        <p>{user.message || "This seller hasn't provided a bio."}</p>
                    </div>
                    <div className="contact">
                        <h1>Contact</h1>
                        <p>Email: {user.email || "No instructions"}</p>
                        <p>Phone: {user.phone || "No instructions"}</p>
                    </div>
                </div>
                {cards.length > 0 ? (
                    <ul className='profile-cards-list'>
                        {cards.map(card => (
                            <li key={card._id} className='profile-cards-item'>
                                <h4>Title: {card.title}</h4>
                                <img src={`http://localhost:5000${card.image}`} className='profile-cards-img' alt="Card" />
                                <p>Price: {card.price}$</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No cards</p>
                )}
            </div>
        </>
    );
}

export default SellerProfile;
