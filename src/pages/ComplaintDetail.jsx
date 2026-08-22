import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getComplaintByIdApi, updateComplaintApi } from '../services/api';
import toast from 'react-hot-toast';

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState({ title: '', category: '', description: '' });

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const response = await getComplaintByIdApi(id);
      setComplaint(response.data);
      setEditData({
        title: response.data.title,
        category: response.data.category,
        description: response.data.description
      });
    } catch (error) {
      toast.error('Failed to load complaint');
      navigate('/student');
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateComplaintApi(id, editData);
      toast.success('Complaint updated successfully');
      setIsEditing(false);
      fetchComplaint();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update complaint';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING': return 'bg-amber-100 text-amber-800';
      case 'IN_PROGRESS': return 'bg-purple-100 text-purple-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'PENDING': return 'Pending Review';
      case 'IN_PROGRESS': return 'In Progress';
      case 'RESOLVED': return 'Resolved';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <Sidebar />
        <div className="flex-1 p-8">Loading...</div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <Sidebar />
        <div className="flex-1 p-8">Complaint not found</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <Sidebar />
      
      <div className="flex-1 p-8">
        <button 
          onClick={() => navigate('/student')}
          className="mb-4 hover:underline transition"
          style={{ color: '#7F77DD' }}
        >
          ← Back to Dashboard
        </button>
        
        <div className="bg-white rounded-lg shadow-md" style={{ border: '1px solid #E0D9FF' }}>
          <div className="p-6 border-b" style={{ borderColor: '#F3F4F6' }}>
            <div className="flex justify-between items-start">
              <div className="flex-1 mr-4">
                {isEditing ? (
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                    className="text-2xl font-bold w-full px-3 py-1 border rounded focus:outline-none focus:ring-2"
                    style={{ borderColor: '#E0D9FF' }}
                    required
                  />
                ) : (
                  <h1 className="text-2xl font-bold break-words" style={{ color: '#1F2937' }}>{complaint.title}</h1>
                )}
                <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
                  Complaint #{complaint.id} • {new Date(complaint.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
                  {getStatusText(complaint.status)}
                </span>
                {complaint.status === 'PENDING' && !isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="text-sm px-3 py-1 bg-white border rounded hover:bg-gray-50 transition"
                    style={{ borderColor: '#E0D9FF', color: '#7F77DD' }}
                  >
                    Edit Complaint
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {isEditing ? (
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">Category</label>
                  <select
                    name="category"
                    value={editData.category}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white"
                    style={{ borderColor: '#E0D9FF' }}
                    required
                  >
                    <option value="PLUMBING">Plumbing</option>
                    <option value="ELECTRICAL">Electrical</option>
                    <option value="CARPENTRY">Carpentry</option>
                    <option value="CLEANING">Cleaning</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">Description</label>
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 min-h-[100px]"
                    style={{ borderColor: '#E0D9FF' }}
                    required
                  />
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 text-white rounded-lg transition-colors duration-200 font-medium disabled:opacity-50"
                    style={{ backgroundColor: '#7F77DD' }}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    disabled={saving}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: '#6B7280' }}>Category</h3>
                  <p className="mt-1" style={{ color: '#1F2937' }}>{complaint.category}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: '#6B7280' }}>Description</h3>
                  <p className="mt-1 whitespace-pre-wrap" style={{ color: '#4B5563' }}>{complaint.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: '#6B7280' }}>Location</h3>
                  <p className="mt-1" style={{ color: '#1F2937' }}>Block {complaint.hostelBlock}, Room {complaint.roomNumber}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: '#6B7280' }}>Last Updated</h3>
                  <p className="mt-1 text-sm" style={{ color: '#9CA3AF' }}>
                    {new Date(complaint.updatedAt).toLocaleString()}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;