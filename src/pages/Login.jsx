import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginApi } from '../services/api';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginApi({ email, password });
      const data = response.data;
      
      login(data);
      toast.success(`Welcome back, ${data.name}!`);
      
      if (data.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F5F3FF' }}>
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8" style={{ border: '1px solid #E0D9FF' }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#7F77DD' }}>DormFix</h1>
          <p className="text-gray-600 mt-2">Hostel Issue Reporting System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{ borderColor: '#E0D9FF' }}
              onFocus={(e) => {
                e.target.style.borderColor = '#7F77DD';
                e.target.style.ring = '2px solid #7F77DD';
              }}
              onBlur={(e) => e.target.style.borderColor = '#E0D9FF'}
              placeholder="student@college.edu"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{ borderColor: '#E0D9FF' }}
              onFocus={(e) => {
                e.target.style.borderColor = '#7F77DD';
                e.target.style.ring = '2px solid #7F77DD';
              }}
              onBlur={(e) => e.target.style.borderColor = '#E0D9FF'}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white py-2 rounded-lg transition-colors duration-200 font-medium disabled:opacity-50"
            style={{ backgroundColor: '#7F77DD' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#6B63C4'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#7F77DD'}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="hover:underline" style={{ color: '#7F77DD' }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;