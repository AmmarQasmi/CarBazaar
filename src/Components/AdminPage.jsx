import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUserData, setEditUserData] = useState(null);
  const [editPostData, setEditPostData] = useState(null);
  const [editInsuranceData, setEditInsuranceData] = useState(null);
  const [editMaintenanceData, setEditMaintenanceData] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const navigate = useNavigate();

  const usersApiUrl = 'http://localhost:5000/api/users';
  const postsApiUrl = 'http://localhost:5000/api/post';
  const insuranceApiUrl = 'http://localhost:5000/api/insurance';
  const maintenanceApiUrl = 'http://localhost:5000/api/maintenance';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, postsResponse, insuranceResponse, maintenanceResponse] = await Promise.all([
          fetch(usersApiUrl),
          fetch(postsApiUrl),
          fetch(insuranceApiUrl),
          fetch(maintenanceApiUrl)
        ]);

        const [usersData, postsData, insuranceData, maintenanceData] = await Promise.all([
          usersResponse.json(),
          postsResponse.json(),
          insuranceResponse.json(),
          maintenanceResponse.json()
        ]);

        setUsers(usersData.data);
        setPosts(postsData.data);
        setInsurances(insuranceData.data);
        setMaintenances(maintenanceData.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditUser = (user) => {
    setEditUserData(user);
    setIsUserModalOpen(true);
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`${usersApiUrl}/update/${editUserData.u_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editUserData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setUsers(users.map(user => user.u_id === editUserData.u_id ? editUserData : user));
        setIsUserModalOpen(false);
        setEditUserData(null);
      } else {
        console.error('Error updating user:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`${usersApiUrl}/${userId}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.status === 'success') {
          setUsers(users.filter(user => user.u_id !== userId));
        } else {
          console.error('Server responded with an error:', result.message);
          alert(`Failed to delete user: ${result.message}`);
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to delete user:', errorData.message);
        alert(`Failed to delete user: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An unexpected error occurred while deleting the user.');
    }
  };

  const handleEditPost = (post) => {
    setEditPostData(post);
    setIsPostModalOpen(true);
  };

  const handleUpdatePost = async () => {
    try {
      const response = await fetch(`${postsApiUrl}/${editPostData.post_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editPostData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setPosts(posts.map(post => post.post_id === editPostData.post_id ? editPostData : post));
        setIsPostModalOpen(false);
        setEditPostData(null);
      } else {
        console.error('Error updating post:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`${postsApiUrl}/${postId}`, { method: 'DELETE' });
      if (response.ok) {
        setPosts(posts.filter(post => post.post_id !== postId));
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditInsurance = (insurance) => {
    setEditInsuranceData(insurance);
    setIsInsuranceModalOpen(true);
  };

  const handleUpdateInsurance = async () => {
    try {
      const response = await fetch(`${insuranceApiUrl}/${editInsuranceData.policy_number}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editInsuranceData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setInsurances(insurances.map(insurance => 
          insurance.policy_number === editInsuranceData.policy_number ? editInsuranceData : insurance
        ));
        setIsInsuranceModalOpen(false);
        setEditInsuranceData(null);
      } else {
        console.error('Error updating insurance:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteInsurance = async (policyNumber) => {
    try {
      const response = await fetch(`${insuranceApiUrl}/${policyNumber}`, { method: 'DELETE' });
      if (response.ok) {
        setInsurances(insurances.filter(insurance => insurance.policy_number !== policyNumber));
      } else {
        console.error('Failed to delete insurance');
      }
    } catch (error) {
      console.error('Error deleting insurance:', error);
    }
  };

  const handleEditMaintenance = (maintenance) => {
    setEditMaintenanceData(maintenance);
    setIsMaintenanceModalOpen(true);
  };

  const handleUpdateMaintenance = async () => {
    try {
      const response = await fetch(`${maintenanceApiUrl}/${editMaintenanceData.maintenance_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editMaintenanceData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setMaintenances(maintenances.map(maintenance => 
          maintenance.maintenance_id === editMaintenanceData.maintenance_id ? editMaintenanceData : maintenance
        ));
        setIsMaintenanceModalOpen(false);
        setEditMaintenanceData(null);
      } else {
        console.error('Error updating maintenance:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteMaintenance = async (maintenanceId) => {
    try {
      const response = await fetch(`${maintenanceApiUrl}/${maintenanceId}`, { method: 'DELETE' });
      if (response.ok) {
        setMaintenances(maintenances.filter(maintenance => maintenance.maintenance_id !== maintenanceId));
      } else {
        console.error('Failed to delete maintenance');
      }
    } catch (error) {
      console.error('Error deleting maintenance:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen mt-7 bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold mb-5 mt-5 text-center text-red-300">Admin Dashboard</h1>

      {/* Users Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-red-200">Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.u_id}>
                  <td className="border px-4 py-2">{user.u_id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-yellow-500 text-white rounded px-2 py-1 mr-2 hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.u_id)}
                      className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Posts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Seller</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.post_id}>
                  <td className="border px-4 py-2">{post.post_id}</td>
                  <td className="border px-4 py-2">{post.vehicle_make} {post.vehicle_model}</td>
                  <td className="border px-4 py-2">{post.seller_email}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="bg-yellow-500 text-white rounded px-2 py-1 mr-2 hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.post_id)}
                      className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insurance Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Insurance Records</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2">Policy Number</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Coverage Amount</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {insurances.map((insurance) => (
                <tr key={insurance.policy_number}>
                  <td className="border px-4 py-2">{insurance.policy_number}</td>
                  <td className="border px-4 py-2">{insurance.users_u_id}</td>
                  <td className="border px-4 py-2">${insurance.coverage_amount}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEditInsurance(insurance)}
                      className="bg-yellow-500 text-white rounded px-2 py-1 mr-2 hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteInsurance(insurance.policy_number)}
                      className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Maintenance Records</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Service Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {maintenances.map((maintenance) => (
                <tr key={maintenance.maintenance_id}>
                  <td className="border px-4 py-2">{maintenance.maintenance_id}</td>
                  <td className="border px-4 py-2">{maintenance.users_u_id}</td>
                  <td className="border px-4 py-2">{new Date(maintenance.service_date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEditMaintenance(maintenance)}
                      className="bg-yellow-500 text-white rounded px-2 py-1 mr-2 hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMaintenance(maintenance.maintenance_id)}
                      className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">{editUserData.u_id ? 'Edit User' : 'Add New User'}</h2>
            <input
              type="text"
              value={editUserData.name || ''}
              onChange={(e) => setEditUserData({ ...editUserData, name: e.target.value })}
              placeholder="Name"
              className="bg-gray-700 p-2 rounded mb-2 w-full"
            />
            <input
              type="email"
              value={editUserData.email || ''}
              onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
              placeholder="Email"
              className="bg-gray-700 p-2 rounded mb-2 w-full"
            />
            <input
              type="password"
              value={editUserData.password || ''}
              onChange={(e) => setEditUserData({ ...editUserData, password: e.target.value })}
              placeholder="Password"
              className="bg-gray-700 p-2 rounded mb-2 w-full"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editUserData.u_id ? handleUpdateUser : handleAddUser}
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors"
              >
                {editUserData.u_id ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Modal */}
      {isPostModalOpen && editPostData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Post</h2>
            <input
              type="text"
              value={editPostData.vehicle_make || ''}
              onChange={(e) => setEditPostData({ ...editPostData, vehicle_make: e.target.value })}
              placeholder="Make"
              className="bg-gray-700 p-2 rounded mb-2 w-full"
            />
            <input
              type="text"
              value={editPostData.vehicle_model || ''}
              onChange={(e) => setEditPostData({ ...editPostData, vehicle_model: e.target.value })}
              placeholder="Model"
              className="bg-gray-700 p-2 rounded mb-2 w-full"
            />
            <input
              type="number"
              value={editPostData.vehicle_price || ''}
              onChange={(e) => setEditPostData({ ...editPostData, vehicle_price: e.target.value })}
              placeholder="Price"
              className="bg-gray-700 p-2 rounded mb-2 w-full"
            />
            <textarea
              value={editPostData.vehicle_description || ''}
              onChange={(e) => setEditPostData({ ...editPostData, vehicle_description: e.target.value })}
              placeholder="Description"
              className="bg-gray-700 p-2 rounded mb-2 w-full h-24"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePost}
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Insurance Modal */}
      {isInsuranceModalOpen && editInsuranceData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Insurance</h2>
            <input
              type="number"
              value={editInsuranceData.coverage_amount || ''}
              onChange={(e) => setEditInsuranceData({ ...editInsuranceData, coverage_amount: e.target.value })}
              placeholder="Coverage Amount"
              className="bg-gray-700 p-2 rounded mb-2 w-full"
            />
            <input
              type="date"
              value={editInsuranceData.start_date ? editInsuranceData.start_date.split('T')[0] : ''}
              onChange={(e) => setEditInsuranceData({ ...editInsuranceData, start_date: e.target.value })}
              className="bg-gray-700 p-2 rounded mb-2 w-full"
            />
            <input
              type="date"
              value={editInsuranceData.end_date ? editInsuranceData.end_date.split('T')[0] : ''}
              onChange={(e) => setEditInsuranceData({ ...editInsuranceData, end_date: e.target.value })}
              className="bg-gray-700 p-2 rounded mb-2 w-full"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsInsuranceModalOpen(false)}
                className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateInsurance}
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Modal */}
      {isMaintenanceModalOpen && editMaintenanceData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Maintenance</h2>
            <input
              type="date"
              value={editMaintenanceData.service_date ? editMaintenanceData.service_date.split('T')[0] : ''}
              onChange={(e) => setEditMaintenanceData({ ...editMaintenanceData, service_date: e.target.value })}
              className="bg-gray-700 p-2 rounded mb-2 w-full"
            />
            <textarea
              value={editMaintenanceData.service_description || ''}
              onChange={(e) => setEditMaintenanceData({ ...editMaintenanceData, service_description: e.target.value })}
              placeholder="Service Description"
              className="bg-gray-700 p-2 rounded mb-2 w-full h-24"
            />
            <input
              type="number"
              value={editMaintenanceData.cost || ''}
              onChange={(e) => setEditMaintenanceData({ ...editMaintenanceData, cost: e.target.value })}
              placeholder="Cost"
              className="bg-gray-700 p-2 rounded mb-2 w-full"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsMaintenanceModalOpen(false)}
                className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateMaintenance}
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;