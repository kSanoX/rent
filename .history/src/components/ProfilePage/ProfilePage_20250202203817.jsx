import React from 'react';
import "./profile.scss"
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Завершаем загрузку, когда получили пользователя
        });

        return () => unsubscribe();
    }, [auth]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    if (loading) {
        return <p>Loading...</p>; // Показываем, пока Firebase загружает пользователя
    }

    if (!user) {
        return <p>Please log in to view your profile.</p>;
    }

    return (
        <div className='profile__container'>
            <h2>Profile</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default ProfilePage;
