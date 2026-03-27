import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { submitComplaintApi } from '../services/api';
import toast from 'react-hot-toast';

const SubmitComplaint = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitComplaintApi(formData);
      toast.success('Complaint submitted successfully!');
      navigate('/student');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <Sidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6" style={{ color: '#1F2937' }}>Submit New Complaint</h1>
        
        <div className="max-w-2xl bg-white rounded-lg shadow-md p-6" style={{ border: '1px solid #E0D9FF' }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-medium mb-2" style={{ color: '#374151' }}>
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: '#E0D9FF' }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#7F77DD';
                  e.target.style.ring = '2px solid #7F77DD';
                }}
                onBlur={(e) => e.target.style.borderColor = '#E0D9FF'}
                placeholder="e.g., Broken fan, Water leakage"
              />
            </div>

            <div>
              <label className="block font-medium mb-2" style={{ color: '#374151' }}>
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: '#E0D9FF' }}
                onFocus={(e) => e.target.style.borderColor = '#7F77DD'}
                onBlur={(e) => e.target.style.borderColor = '#E0D9FF'}
              >
                <option value="">Select category</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Furniture">Furniture</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2" style={{ color: '#374151' }}>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: '#E0D9FF' }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#7F77DD';
                  e.target.style.ring = '2px solid #7F77DD';
                }}
                onBlur={(e) => e.target.style.borderColor = '#E0D9FF'}
                placeholder="Describe your issue in detail..."
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
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;