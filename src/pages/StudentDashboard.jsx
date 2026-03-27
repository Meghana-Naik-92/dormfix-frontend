import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getMyComplaintsApi, getMyStatsApi } from '../services/api';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [complaintsRes, statsRes] = await Promise.all([
        getMyComplaintsApi(),
        getMyStatsApi()
      ]);
      setComplaints(complaintsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
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

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <Sidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6" style={{ color: '#1F2937' }}>My Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6" style={{ border: '1px solid #E0D9FF' }}>
            <p className="text-sm" style={{ color: '#6B7280' }}>Total Complaints</p>
            <p className="text-3xl font-bold mt-1" style={{ color: '#7F77DD' }}>{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6" style={{ border: '1px solid #E0D9FF' }}>
            <p className="text-sm" style={{ color: '#6B7280' }}>Pending</p>
            <p className="text-3xl font-bold mt-1" style={{ color: '#F59E0B' }}>{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6" style={{ border: '1px solid #E0D9FF' }}>
            <p className="text-sm" style={{ color: '#6B7280' }}>In Progress</p>
            <p className="text-3xl font-bold mt-1" style={{ color: '#7F77DD' }}>{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6" style={{ border: '1px solid #E0D9FF' }}>
            <p className="text-sm" style={{ color: '#6B7280' }}>Resolved</p>
            <p className="text-3xl font-bold mt-1" style={{ color: '#10B981' }}>{stats.resolved}</p>
          </div>
        </div>

        {/* Complaints List */}
        <div className="bg-white rounded-lg shadow-md" style={{ border: '1px solid #E0D9FF' }}>
          <div className="p-6 border-b" style={{ borderColor: '#F3F4F6' }}>
            <h2 className="text-xl font-semibold" style={{ color: '#1F2937' }}>My Complaints</h2>
          </div>
          
          {complaints.length === 0 ? (
            <div className="p-6 text-center" style={{ color: '#6B7280' }}>
              No complaints yet. Submit your first complaint!
            </div>
          ) : (
            <div className="divide-y" style={{ divideColor: '#F3F4F6' }}>
              {complaints.map((complaint) => (
                <Link 
                  key={complaint.id} 
                  to={`/student/complaint/${complaint.id}`}
                  className="block hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg" style={{ color: '#1F2937' }}>{complaint.title}</h3>
                        <p className="mt-1 line-clamp-2" style={{ color: '#6B7280' }}>{complaint.description}</p>
                        <div className="flex gap-4 mt-2">
                          <p className="text-sm" style={{ color: '#9CA3AF' }}>
                            Category: {complaint.category}
                          </p>
                          <p className="text-sm" style={{ color: '#9CA3AF' }}>
                            Room: {complaint.roomNumber}
                          </p>
                        </div>
                        <p className="text-xs mt-2" style={{ color: '#9CA3AF' }}>
                          Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
                        {complaint.status === 'IN_PROGRESS' ? 'In Progress' : complaint.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;