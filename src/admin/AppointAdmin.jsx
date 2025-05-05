import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUserPlus, FiUserX, FiUsers } from 'react-icons/fi';
import toast from "react-hot-toast";

const AppointAdmin = ({ currentUserRole, onClose, refreshUsers }) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseURL}/user/getAllUsers`, {
        headers: {
          Authorization: `${localStorage.getItem('jwt')}`,
        },
      });
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdminAction = async (userId, action) => {
    if (currentUserRole !== 'superadmin') return;

    try {
      const response = await axios.put(
        `${baseURL}/user/update-role`,
        { userId, role: action === 'appoint' ? 'admin' : 'user' },
        {
          headers: {
            Authorization: `${localStorage.getItem('jwt')}`,
          },
        }
      );

      if (response.data.success) {
        const updatedUser = response.data.data;
        toast.success(`${updatedUser.firstName} ${updatedUser.lastName} is now an ${updatedUser.role}`);
        await fetchUsers();
        refreshUsers?.();
      }
    } catch (error) {
      console.error(`Error ${action}ing admin:`, error);
    }
  };

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName || ''}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentAdmins = users.filter(user => user.role === 'admin');

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-3xl mx-auto max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-700 flex items-center">
          <FiUsers className="mr-2" /> Admin Management
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-3xl"
        >
          &times;
        </button>
      </div>

      {/* Current Admins */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-purple-600 mb-4">👑 Current Admins</h3>
        {currentAdmins.length === 0 ? (
          <p className="text-gray-500">No admins currently assigned.</p>
        ) : (
          <ul className="space-y-4">
            {currentAdmins.map(admin => (
              <li key={admin._id} className="flex justify-between items-center bg-purple-50 p-4 rounded-lg shadow-sm">
                <div>
                  <p className="font-medium text-lg">{admin.firstName} {admin.lastName}</p>
                  <p className="text-sm text-gray-500">{admin.email}</p>
                </div>
                {currentUserRole === 'superadmin' && (
                  <button
                    onClick={() => handleAdminAction(admin._id, 'remove')}
                    className="px-4 py-2 bg-red-100 text-red-600 font-semibold rounded-md hover:bg-red-200 flex items-center text-sm"
                  >
                    <FiUserX className="mr-2" /> Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Appoint Admin */}
      {currentUserRole === 'superadmin' && (
        <div>
          <h3 className="text-xl font-semibold text-purple-600 mb-4">➕ Appoint New Admin</h3>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <ul className="space-y-4">
  {filteredUsers
    .filter(user => user.role === 'user')
    .map(user => (
      <li key={user._id} className="grid grid-cols-[1fr_auto] items-center bg-white border rounded-lg p-4 shadow-sm">
        <div className="overflow-hidden">
          <p className="font-medium text-lg truncate">{user.firstName} {user.lastName}</p>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        </div>
        <button
          onClick={() => handleAdminAction(user._id, 'appoint')}
          className="ml-4 px-4 py-2 bg-purple-100 text-purple-600 font-semibold rounded-md hover:bg-purple-200 flex items-center text-sm whitespace-nowrap"
        >
          <FiUserPlus className="mr-2" /> Make Admin
        </button>
      </li>
    ))}
</ul>

          )}
        </div>
      )}
    </div>
  );
};

export default AppointAdmin;
