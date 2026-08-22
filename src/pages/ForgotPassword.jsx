import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPasswordApi } from '../services/api';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPasswordApi({ email });
      toast.success('Password reset email sent! Check your inbox.');
      setEmail('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F5F3FF' }}>
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8" style={{ border: '1px solid #E0D9FF' }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#7F77DD' }}>Reset Password</h1>
          <p className="text-gray-600 mt-2">Enter your email to receive reset link</p>
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{ borderColor: '#E0D9FF' }}
              placeholder="student@college.edu"
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
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Remember your password?{' '}
          <Link to="/login" className="hover:underline" style={{ color: '#7F77DD' }}>
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;