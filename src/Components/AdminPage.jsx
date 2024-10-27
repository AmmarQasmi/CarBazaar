import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users'); // Fetch users from your API
        
        // Log response to debug
        console.log('Response from API:', response.data);

        // Ensure response structure matches expected format
        if (response.data && !response.data.error && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
          console.log('Loaded users:', response.data.users); // Check loaded user data
        } else {
          throw new Error('Unexpected response format or no users found');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/users/${userId}`); // Correct API call to delete user
        setUsers(users.filter(user => user.u_id !== userId)); // Update state
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user.'); // Set error message on delete failure
      }
    }
  };

  const handleViewPostsComments = async (user) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${user.u_id}`); // Fetch user posts
      const userData = response.data.user;
      alert(`User: ${userData.name}\nPosts: ${JSON.stringify(userData.posts || [], null, 2)}\nComments: ${JSON.stringify(userData.comments || [], null, 2)}`);
    } catch (error) {
      console.error('Error fetching user posts/comments:', error);
      alert('Failed to fetch user posts/comments.');
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>; 

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-semibold mb-5">Admin Page</h1>
      <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gray-700">
            <th className="py-3 px-5 text-left">Name</th>
            <th className="py-3 px-5 text-left">Phone Number</th>
            <th className="py-3 px-5 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.u_id} className="hover:bg-gray-700">
                <td className="py-3 px-5">{user.name}</td> {/* Accessing name */}
                <td className="py-3 px-5">{user.phone_no}</td> {/* Accessing phone_no */}
                <td className="py-3 px-5 flex gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1"
                    onClick={() => handleViewPostsComments(user)}
                  >
                    View Posts/Comments
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1"
                    onClick={() => deleteUser(user.u_id)}
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-3 px-5 text-center">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
