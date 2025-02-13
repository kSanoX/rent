import { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import FeaturedTitle from "./FeaturedTitle";
import send from "../images/icons/Send.svg";
import twitter from "../images/icons/twiter.svg";
import defaultAvatar from "../../src/images/profile-avatar-default.png"

function WorkTeamCards() {
    const { user } = useAuth(); // Проверка на авторизацию
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    // Получаем список пользователей, фильтруем по роли
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // В запрос добавляем авторизационный заголовок, если пользователь авторизован
                const headers = user ? { Authorization: `Bearer ${user.token}` } : {}; 
                const response = await fetch("http://localhost:5000/api/users", { headers });

                if (!response.ok) throw new Error("Ошибка загрузки пользователей");

                const data = await response.json();
                console.log(data); // Проверьте, что приходит от сервера
                const sellers = data.filter(user => user.role === "seller"); // Фильтруем только продавцов
                setUsers(sellers);
            } catch (error) {
                console.error("Ошибка:", error);
            }
        };

        fetchUsers();
    }, [user]); // Добавлен зависимость от пользователя для актуализации запроса

    return (
        <div className="work__team">
            <FeaturedTitle 
                title="Meet the Estatein Sellers" 
                text="At Estatein, our success is driven by the dedication and expertise of our team. Get to know the people behind our mission to make your real estate dreams a reality." 
                showButton={false} 
            />
            <div className="flexible__work-team">
                {users.map((user) => (
                    <div key={user._id} className="work__team-item">
                        <img 
                            src={`http://localhost:5000${user.avatar || defaultAvatar}`} 
                            alt={user.firstName}  
                            onClick={() => navigate(`/profile/${user._id}`)} 
                            style={{cursor: "pointer"}}
                        />
                        <a className="twitter" target="_blank" rel="noopener noreferrer">
                            <img src={twitter} alt="Twitter" />
                        </a>
                        <h2>{user.firstName} {user.lastName}</h2>
                        <p>Seller</p>
                        <button className="say__hello">
                            Say Hello 👋 <img src={send} alt="Send" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkTeamCards;
