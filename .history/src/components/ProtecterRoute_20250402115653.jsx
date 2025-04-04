import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // путь зависит от твоего проекта

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth(); // Достаём пользователя из контекста

  return user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;