import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getAllComplaintsApi, getAdminStatsApi, updateComplaintStatusApi } from '../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [filterBlock, setFilterBlock] = useState('');

  useEffect(() => {
    fetchData();
  }, [filter, filterBlock]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filter) params.status = filter;
      if (filterBlock) params.hostelBlock = filterBlock;
      
      const [complaintsRes, statsRes] = await Promise.all([
        getAllComplaintsApi(params),
        getAdminStatsApi()
      ]);
      setComplaints(complaintsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await updateComplaintStatusApi(id, newStatus);
      toast.success('Status updated successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to update status');
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

  if (loading) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <Sidebar />
        <div className="flex-1 p-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <Sidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6" style={{ color: '#1F2937' }}>Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6" style={{ border: '1px solid #E0D9FF' }}>
            <p className="text-sm" style={{ color: '#6B7280' }}>Total Complaints</p>
            <p className="text-3xl font-bold mt-1" style={{ color: '#7F77DD' }}>{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6" style={{ border: '1px solid #E0D9FF' }}>
            <p className="text-sm" style={{ color: '#6B7280' }}>Pending</p>
            <p className="text-3xl font-bold mt-1" style={{ color: '#EF4444' }}>{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6" style={{ border: '1px solid #E0D9FF' }}>
            <p className="text-sm" style={{ color: '#6B7280' }}>In Progress</p>
            <p className="text-3xl font-bold mt-1" style={{ color: '#F59E0B' }}>{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6" style={{ border: '1px solid #E0D9FF' }}>
            <p className="text-sm" style={{ color: '#6B7280' }}>Resolved</p>
            <p className="text-3xl font-bold mt-1" style={{ color: '#10B981' }}>{stats.resolved}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6" style={{ border: '1px solid #E0D9FF' }}>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-sm mr-2" style={{ color: '#6B7280' }}>Filter by Status:</label>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{ borderColor: '#E0D9FF' }}
              >
                <option value="">All</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm mr-2" style={{ color: '#6B7280' }}>Filter by Block:</label>
              <select 
                value={filterBlock} 
                onChange={(e) => setFilterBlock(e.target.value)}
                className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{ borderColor: '#E0D9FF' }}
              >
                <option value="">All Blocks</option>
                <option value="Block A">Block A</option>
                <option value="Block B">Block B</option>
                <option value="Block C">Block C</option>
                <option value="Block D">Block D</option>
              </select>
            </div>
            
            {(filter || filterBlock) && (
              <button
                onClick={() => {
                  setFilter('');
                  setFilterBlock('');
                }}
                className="px-3 py-1 rounded-md transition-colors hover:underline"
                style={{ color: '#DC2626' }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto" style={{ border: '1px solid #E0D9FF' }}>
          <table className="w-full">
            <thead className="border-b" style={{ backgroundColor: '#F9FAFB', borderColor: '#F3F4F6' }}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#6B7280' }}>ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#6B7280' }}>Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#6B7280' }}>Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#6B7280' }}>Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#6B7280' }}>Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#6B7280' }}>Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#6B7280' }}>Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y" style={{ divideColor: '#F3F4F6' }}>
              {complaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/admin/complaint/${complaint.id}`}
                      className="font-medium hover:underline"
                      style={{ color: '#7F77DD' }}
                    >
                      #{complaint.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      to={`/admin/complaint/${complaint.id}`}
                      className="hover:underline"
                      style={{ color: '#1F2937' }}
                    >
                      <p className="font-medium">{complaint.studentName}</p>
                      <p className="text-xs" style={{ color: '#6B7280' }}>{complaint.studentEmail}</p>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" style={{ color: '#4B5563' }}>
                    <Link to={`/admin/complaint/${complaint.id}`}>
                      {complaint.roomNumber}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      to={`/admin/complaint/${complaint.id}`}
                      className="hover:underline"
                      style={{ color: '#1F2937' }}
                    >
                      {complaint.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" style={{ color: '#4B5563' }}>
                    <Link to={`/admin/complaint/${complaint.id}`}>
                      {complaint.category}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                      {complaint.status === 'IN_PROGRESS' ? 'In Progress' : complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={complaint.status}
                      onChange={(e) => handleStatusUpdate(complaint.id, e.target.value, e)}
                      onClick={(e) => e.stopPropagation()}
                      className="px-2 py-1 border rounded-md text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
                      style={{ borderColor: '#E0D9FF' }}
                    >
                      <option value="PENDING">Set Pending</option>
                      <option value="IN_PROGRESS">Set In Progress</option>
                      <option value="RESOLVED">Set Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {complaints.length === 0 && (
            <div className="p-8 text-center" style={{ color: '#6B7280' }}>
              No complaints found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;