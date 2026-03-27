import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  // Wait for localStorage check to finish
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-purple-600 text-lg">Loading...</div>
      </div>
    );
  }

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role → redirect to correct dashboard
  if (role && user.role !== role) {
    return <Navigate to={
      user.role === 'ADMIN' ? '/admin' : '/student'
    } replace />;
  }

  return children;
};

export default ProtectedRoute;