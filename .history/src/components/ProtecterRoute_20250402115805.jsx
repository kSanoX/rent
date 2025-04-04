import { Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth(); // Достаём пользователя из контекста

  return user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;