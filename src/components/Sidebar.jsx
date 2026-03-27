import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isStudent = user?.role === 'STUDENT';
  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="w-64 min-h-screen flex flex-col shadow-lg" style={{ backgroundColor: '#2E2A6E' }}>
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: '#4A4690' }}>
        <h1 className="text-2xl font-bold text-white">DormFix</h1>
        <p className="text-sm mt-1" style={{ color: '#B8B4FF' }}>
          {isStudent ? 'Student Portal' : 'Admin Portal'}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {isStudent && (
          <>
            <Link
              to="/student"
              className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 text-white hover:bg-white/10"
            >
              <span>📋</span>
              <span>Dashboard</span>
            </Link>
            <Link
              to="/student/submit"
              className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 text-white hover:bg-white/10"
            >
              <span>✏️</span>
              <span>Submit Complaint</span>
            </Link>
            <Link
              to="/student/profile"
              className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 text-white hover:bg-white/10"
            >
              <span>👤</span>
              <span>Profile</span>
            </Link>
          </>
        )}

        {isAdmin && (
          <>
            <Link
              to="/admin"
              className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 text-white hover:bg-white/10"
            >
              <span>📊</span>
              <span>Dashboard</span>
            </Link>
          </>
        )}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t" style={{ borderColor: '#4A4690' }}>
        <div className="mb-3 px-2">
          <p className="font-semibold text-white text-sm">{user?.name}</p>
          <p className="text-xs" style={{ color: '#B8B4FF' }}>{user?.email}</p>
          {isStudent && (
            <p className="text-xs mt-1" style={{ color: '#9B97E0' }}>
              Room: {user?.roomNumber || 'N/A'}
            </p>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium text-white"
          style={{ backgroundColor: '#DC2626' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#B91C1C'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#DC2626'}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;