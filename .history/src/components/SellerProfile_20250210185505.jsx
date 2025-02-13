import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultAvatar from "../../src/images/profile-avatar-default.png";
import "../styles/sellerProfile.scss"
import Header from "./HomePage/Header/Header";

function SellerProfile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${id}`);
                if (!response.ok) throw new Error("Ошибка загрузки профиля");

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Ошибка:", error);
            }
        };

        fetchUserProfile();
    }, [id]);

    if (!user) return <p>Loading...</p>;

    return (
        <>
        <Header></Header>
        <div className="seller-profile">
            <div className="profile-header">
                <div className="profile-avatar">
                <img 
                    src={`http://localhost:5000${user.avatar}` || defaultAvatar}
                    alt={`${user.firstName} ${user.lastName}`} 
                    className="profile-avatar" 
                />
                </div>
                <h1>{user.firstName} {user.lastName}</h1>
                <p>{user.role}</p>
            </div>
            <div className="profile-details">
                <h1>About</h1>
                <p>{user.message || "This seller hasn't provided a bio."}</p>
                <h3>Contact</h3>
                <p>Email: {user.email}</p>
                <p>Twitter: <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer">@twitter</a></p>
            </div>
        </div>
        </>
    );
}

export default SellerProfile;
