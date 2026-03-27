import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <Sidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6" style={{ color: '#1F2937' }}>My Profile</h1>
        
        <div className="max-w-2xl bg-white rounded-lg shadow-md p-6" style={{ border: '1px solid #E0D9FF' }}>
          <div className="space-y-4">
            <div>
              <label className="text-sm" style={{ color: '#6B7280' }}>Full Name</label>
              <p className="text-lg font-semibold mt-1" style={{ color: '#1F2937' }}>{user?.name || 'Not set'}</p>
            </div>
            
            <div>
              <label className="text-sm" style={{ color: '#6B7280' }}>Email</label>
              <p className="text-lg mt-1" style={{ color: '#1F2937' }}>{user?.email || 'Not set'}</p>
            </div>
            
            <div>
              <label className="text-sm" style={{ color: '#6B7280' }}>Role</label>
              <p className="text-lg mt-1" style={{ color: '#7F77DD', fontWeight: '500' }}>{user?.role || 'Not set'}</p>
            </div>
            
            <div>
              <label className="text-sm" style={{ color: '#6B7280' }}>Hostel Block</label>
              <p className="text-lg mt-1" style={{ color: '#1F2937' }}>{user?.hostelBlock || 'Not specified'}</p>
            </div>
            
            <div>
              <label className="text-sm" style={{ color: '#6B7280' }}>Room Number</label>
              <p className="text-lg mt-1" style={{ color: '#1F2937' }}>{user?.roomNumber || 'Not specified'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;