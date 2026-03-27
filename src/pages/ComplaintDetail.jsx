import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getComplaintByIdApi } from '../services/api';
import toast from 'react-hot-toast';

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const response = await getComplaintByIdApi(id);
      setComplaint(response.data);
    } catch (error) {
      toast.error('Failed to load complaint');
      navigate('/student');
    } finally {
      setLoading(false);
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
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#1F2937' }}>{complaint.title}</h1>
                <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
                  Complaint #{complaint.id} • {new Date(complaint.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
                {getStatusText(complaint.status)}
              </span>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-sm" style={{ color: '#6B7280' }}>Category</h3>
              <p className="mt-1" style={{ color: '#1F2937' }}>{complaint.category}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-sm" style={{ color: '#6B7280' }}>Description</h3>
              <p className="mt-1" style={{ color: '#4B5563' }}>{complaint.description}</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;