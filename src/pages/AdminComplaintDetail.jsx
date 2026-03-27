import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getAdminComplaintByIdApi, updateComplaintStatusApi } from '../services/api';
import toast from 'react-hot-toast';

const AdminComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const response = await getAdminComplaintByIdApi(id);
      setComplaint(response.data);
    } catch (error) {
      toast.error('Failed to load complaint');
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      await updateComplaintStatusApi(id, newStatus);
      toast.success('Status updated successfully');
      fetchComplaint();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING': return 'bg-red-100 text-red-800';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getButtonColor = (status, currentStatus) => {
    if (currentStatus === status) {
      switch(status) {
        case 'PENDING': return '#EF4444';
        case 'IN_PROGRESS': return '#F59E0B';
        case 'RESOLVED': return '#10B981';
        default: return '#6B7280';
      }
    }
    return '#E5E7EB';
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
          onClick={() => navigate('/admin')}
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
                {complaint.status === 'IN_PROGRESS' ? 'In Progress' : complaint.status}
              </span>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-sm" style={{ color: '#6B7280' }}>Student Information</h3>
              <p className="mt-1" style={{ color: '#1F2937' }}><strong>Name:</strong> {complaint.studentName}</p>
              <p style={{ color: '#4B5563' }}><strong>Email:</strong> {complaint.studentEmail}</p>
              <p style={{ color: '#4B5563' }}><strong>Location:</strong> Block {complaint.hostelBlock}, Room {complaint.roomNumber}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-sm" style={{ color: '#6B7280' }}>Category</h3>
              <p className="mt-1" style={{ color: '#1F2937' }}>{complaint.category}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-sm" style={{ color: '#6B7280' }}>Description</h3>
              <p className="mt-1" style={{ color: '#4B5563' }}>{complaint.description}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-sm" style={{ color: '#6B7280' }}>Update Status</h3>
              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => handleStatusUpdate('PENDING')}
                  disabled={updating || complaint.status === 'PENDING'}
                  className="px-4 py-2 rounded-md transition-colors duration-200 font-medium disabled:opacity-50"
                  style={{ 
                    backgroundColor: getButtonColor('PENDING', complaint.status),
                    color: complaint.status === 'PENDING' ? 'white' : '#374151',
                    cursor: updating || complaint.status === 'PENDING' ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (complaint.status !== 'PENDING') {
                      e.target.style.backgroundColor = '#FEE2E2';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (complaint.status !== 'PENDING') {
                      e.target.style.backgroundColor = '#E5E7EB';
                    }
                  }}
                >
                  Pending
                </button>
                <button
                  onClick={() => handleStatusUpdate('IN_PROGRESS')}
                  disabled={updating || complaint.status === 'IN_PROGRESS'}
                  className="px-4 py-2 rounded-md transition-colors duration-200 font-medium disabled:opacity-50"
                  style={{ 
                    backgroundColor: getButtonColor('IN_PROGRESS', complaint.status),
                    color: complaint.status === 'IN_PROGRESS' ? 'white' : '#374151',
                    cursor: updating || complaint.status === 'IN_PROGRESS' ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (complaint.status !== 'IN_PROGRESS') {
                      e.target.style.backgroundColor = '#FEF3C7';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (complaint.status !== 'IN_PROGRESS') {
                      e.target.style.backgroundColor = '#E5E7EB';
                    }
                  }}
                >
                  In Progress
                </button>
                <button
                  onClick={() => handleStatusUpdate('RESOLVED')}
                  disabled={updating || complaint.status === 'RESOLVED'}
                  className="px-4 py-2 rounded-md transition-colors duration-200 font-medium disabled:opacity-50"
                  style={{ 
                    backgroundColor: getButtonColor('RESOLVED', complaint.status),
                    color: complaint.status === 'RESOLVED' ? 'white' : '#374151',
                    cursor: updating || complaint.status === 'RESOLVED' ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (complaint.status !== 'RESOLVED') {
                      e.target.style.backgroundColor = '#D1FAE5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (complaint.status !== 'RESOLVED') {
                      e.target.style.backgroundColor = '#E5E7EB';
                    }
                  }}
                >
                  Resolved
                </button>
              </div>
              {updating && <p className="text-sm mt-2" style={{ color: '#6B7280' }}>Updating...</p>}
            </div>
            
            <div>
              <h3 className="font-semibold text-sm" style={{ color: '#6B7280' }}>Timeline</h3>
              <p className="mt-1 text-sm" style={{ color: '#4B5563' }}>
                <strong>Created:</strong> {new Date(complaint.createdAt).toLocaleString()}
              </p>
              <p className="text-sm" style={{ color: '#4B5563' }}>
                <strong>Last Updated:</strong> {new Date(complaint.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComplaintDetail;