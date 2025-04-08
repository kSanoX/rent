import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Загрузка...</div>; // Спиннер или индикатор загрузки

  return user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
