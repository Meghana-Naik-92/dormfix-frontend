import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerApi } from '../services/api';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT',
    hostelBlock: '',
    roomNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerApi(formData);
      const data = response.data;
      
      login(data);
      toast.success('Account created successfully!');
      
      if (data.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F5F3FF' }}>
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8" style={{ border: '1px solid #E0D9FF' }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#7F77DD' }}>Create Account</h1>
          <p className="text-gray-600 mt-2">Join DormFix</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{ borderColor: '#E0D9FF' }}
              onFocus={(e) => {
                e.target.style.borderColor = '#7F77DD';
                e.target.style.ring = '2px solid #7F77DD';
              }}
              onBlur={(e) => e.target.style.borderColor = '#E0D9FF'}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{ borderColor: '#E0D9FF' }}
              onFocus={(e) => {
                e.target.style.borderColor = '#7F77DD';
                e.target.style.ring = '2px solid #7F77DD';
              }}
              onBlur={(e) => e.target.style.borderColor = '#E0D9FF'}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{ borderColor: '#E0D9FF' }}
              onFocus={(e) => {
                e.target.style.borderColor = '#7F77DD';
                e.target.style.ring = '2px solid #7F77DD';
              }}
              onBlur={(e) => e.target.style.borderColor = '#E0D9FF'}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{ borderColor: '#E0D9FF' }}
              onFocus={(e) => e.target.style.borderColor = '#7F77DD'}
              onBlur={(e) => e.target.style.borderColor = '#E0D9FF'}
            >
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Admin/Warden</option>
            </select>
          </div>

          {formData.role === 'STUDENT' && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Hostel Block
                </label>
                <input
                  type="text"
                  name="hostelBlock"
                  value={formData.hostelBlock}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#E0D9FF' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#7F77DD';
                    e.target.style.ring = '2px solid #7F77DD';
                  }}
                  onBlur={(e) => e.target.style.borderColor = '#E0D9FF'}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Room Number
                </label>
                <input
                  type="text"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#E0D9FF' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#7F77DD';
                    e.target.style.ring = '2px solid #7F77DD';
                  }}
                  onBlur={(e) => e.target.style.borderColor = '#E0D9FF'}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white py-2 rounded-lg transition-colors duration-200 font-medium disabled:opacity-50"
            style={{ backgroundColor: '#7F77DD' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#6B63C4'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#7F77DD'}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="hover:underline" style={{ color: '#7F77DD' }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;