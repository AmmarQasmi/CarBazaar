import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [soldPosts, setSoldPosts] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editPostData, setEditPostData] = useState(null);
  const [editInsuranceData, setEditInsuranceData] = useState(null);
  const [editMaintenanceData, setEditMaintenanceData] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const navigate = useNavigate();

  const usersApiUrl = 'http://localhost:5000/api/users';
  const postsApiUrl = 'http://localhost:5000/api/post';
  const insuranceApiUrl = 'http://localhost:5000/api/insurance';
  const maintenanceApiUrl = 'http://localhost:5000/api/maintenance';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(usersApiUrl);
        const usersData = await userResponse.json();
        const postsResponse = await fetch(postsApiUrl);
        const postsData = await postsResponse.json();
        const insuranceResponse = await fetch(insuranceApiUrl);
        const insuranceData = await insuranceResponse.json();
        const maintenanceResponse = await fetch(maintenanceApiUrl);
        const maintenanceData = await maintenanceResponse.json();

        const recentEmail = localStorage.getItem('userEmail');
        if (!recentEmail) {
          console.error('No recent email found in localStorage.');
          return;
        }

        const loggedInUser = usersData.data.find(
          (user) => user.is_login === 'Y' && user.email === recentEmail
        );

        if (loggedInUser) {
          setUser(loggedInUser);
          setNewName(loggedInUser.name);
          setNewEmail(loggedInUser.email);
          const userPosts = postsData.data.filter(
            (post) => post.seller_email === loggedInUser.email
          );
          setPosts(userPosts.filter(post => post.status !== 'sold'));
          setSoldPosts(userPosts.filter(post => post.status === 'sold'));
          const userInsurances = insuranceData.data.filter(
            (insurance) => insurance.users_u_id === loggedInUser.u_id
          );
          setInsurances(userInsurances);
          const userMaintenances = maintenanceData.data.filter(
            (maintenance) => maintenance.users_u_id === loggedInUser.u_id
          );
          setMaintenances(userMaintenances);
        } else {
          console.warn('No matching user found for the logged-in criteria.');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProfileUpdate = async () => {
    if (newName !== user.name || newEmail !== user.email || newPassword) {
      try {
        await fetch(`${usersApiUrl}/update/${user.u_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newName,
            email: newEmail,
            password: newPassword,
          }),
        });

        setUser({ ...user, name: newName, email: newEmail });
        setEditMode(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
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

  const handleMarkAsSold = async (postId) => {
    try {
      await fetch(`${postsApiUrl}/${postId}/sold`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      const soldPost = posts.find(post => post.post_id === postId);         // Find the post in the current posts array
      setPosts(posts.filter(post => post.post_id !== postId));             // Remove the post from the current posts list
      setSoldPosts([...soldPosts, { ...soldPost, status: 'sold' }]);      // Add the sold post to the soldPosts list
    } catch (error) {
      console.error('Error marking post as sold:', error);
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
        body: JSON.stringify({
          price: editPostData.vehicle_price,
          vehicle_image: editPostData.vehicle_image,
          description: editPostData.vehicle_description,
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setPosts(posts.map(post => post.post_id === editPostData.post_id ? { ...post, ...editPostData } : post));
        setIsPostModalOpen(false);
        setEditPostData(null);
      } else {
        console.error('Error updating post:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
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
        body: JSON.stringify({
          coverage_amount: editInsuranceData.coverage_amount,
          start_date: editInsuranceData.start_date,
          end_date: editInsuranceData.end_date,
          services_service_id: editInsuranceData.services_service_id,
          vehicle_v_id: editInsuranceData.vehicle_v_id,
          users_u_id: editInsuranceData.users_u_id
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setInsurances(insurances.map(insurance =>
          insurance.policy_number === editInsuranceData.policy_number ? { ...insurance, ...editInsuranceData } : insurance
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
        body: JSON.stringify({
          service_date: editMaintenanceData.service_date,
          service_description: editMaintenanceData.service_description,
          cost: editMaintenanceData.cost,
          service_center: editMaintenanceData.service_center,
          services_service_id: editMaintenanceData.services_service_id,
          vehicle_v_id: editMaintenanceData.vehicle_v_id,
          users_u_id: editMaintenanceData.users_u_id,
          appointment_date: editMaintenanceData.appointment_date,
          appointment_time: editMaintenanceData.appointment_time,
          service_location: editMaintenanceData.service_location,
          additional_details: editMaintenanceData.additional_details
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setMaintenances(maintenances.map(maintenance =>
          maintenance.maintenance_id === editMaintenanceData.maintenance_id ? { ...maintenance, ...editMaintenanceData } : maintenance
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
    return <div className="text-white">Loading...</div>;
  }

  if (!user) {
    return <div className="text-white">No user found or logged in.</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-5">
      {/* User profile section */}
      <div className="flex items-center justify-left mb-5 mt-10 w-full text-center">
        <div className="bg-red-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-4xl">
          {user.profile_pic ? (
            <img src={user.profile_pic} alt={`${user.name}'s profile`} className="rounded-full w-full h-full object-cover" />
          ) : (
            <span>{user.name.charAt(0)}</span>
          )}
        </div>
        <div className="flex flex-col items-center ml-5">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-400">{user.phone_no}</p>
        </div>
      </div>


      {/* Profile edit section */}
      <div className="mt-5">
        <button
          onClick={() => setEditMode(!editMode)}
          className={`px-4 py-2 rounded ${editMode ? 'bg-red-600' : 'bg-blue-600'} text-white`}
        >
          {editMode ? 'Cancel' : 'Edit Profile'}
        </button>

        {editMode && (
          <div className="mt-4 bg-gray-900 p-4 rounded-lg">
            <div className="space-y-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Name"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <button
                onClick={handleProfileUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update Profile
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tabs for Posts, Insurance, and Maintenance */}
      <div className="mt-5">
        <div className="flex bg-gray-900 rounded-t-lg">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 ${activeTab === 'posts' ? 'bg-gray-800' : ''}`}
          >
            Active Listings
          </button>
          <button
            onClick={() => setActiveTab('insurance')}
            className={`px-4 py-2 ${activeTab === 'insurance' ? 'bg-gray-800' : ''}`}
          >
            Insurance
          </button>
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`px-4 py-2 ${activeTab === 'maintenance' ? 'bg-gray-800' : ''}`}
          >
            Maintenance
          </button>
        </div>
        <div className="bg-gray-900 p-4 rounded-b-lg">
          {activeTab === 'posts' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Active Listings</h3>
              {posts.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <div key={post.post_id} className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold">{post.vehicle_make} {post.vehicle_model}</h4>
                      <p className="text-sm text-gray-400">{post.vehicle_year}</p>
                      <img
                        src={post.vehicle_image}
                        alt={post.vehicle_make}
                        className="w-full h-40 object-contain rounded my-2"
                      />
                      <p>{post.vehicle_description}</p>
                      <p className="text-sm text-gray-400">{post.location}</p>
                      <p className="text-sm text-gray-400">Price: ${post.vehicle_price}</p>
                      <p className="text-sm text-gray-400">Mileage: {post.vehicle_mileage} miles</p>
                      <div className="mt-2 flex justify-between">
                        <button onClick={() => handleEditPost(post)} className="px-2 py-1 bg-blue-600 text-white rounded">Edit</button>
                        <button onClick={() => handleDeletePost(post.post_id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                        <button onClick={() => handleMarkAsSold(post.post_id)} className="px-2 py-1 bg-green-600 text-white rounded">Mark as Sold</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No active listings available</p>
              )}

              <h3 className="text-xl font-semibold mb-4 mt-8">Sold Cars</h3>
              {soldPosts.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {soldPosts.map((post) => (
                    <div key={post.post_id} className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold">{post.vehicle_make} {post.vehicle_model}</h4>
                      <p className="text-sm text-gray-400">{post.vehicle_year}</p>
                      <img
                        src={post.vehicle_image}
                        alt={post.vehicle_make}
                        className="w-full h-40 object-contain rounded my-2"
                      />
                      <p>{post.vehicle_description}</p>
                      <p className="text-sm text-gray-400">{post.location}</p>
                      <p className="text-sm text-gray-400">Price: ${post.vehicle_price}</p>
                      <p className="text-sm text-gray-400">Mileage: {post.vehicle_mileage} miles</p>
                      <p className="text-sm text-green-400 mt-2">Sold</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No sold cars available</p>
              )}
            </div>
          )}
          {activeTab === 'insurance' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Insurance Services</h3>
              {insurances.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {insurances.map((insurance) => (
                    <div key={insurance.policy_number} className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold">Policy Number: {insurance.policy_number}</h4>
                      <p className="text-sm text-gray-400">Coverage: ${insurance.coverage_amount}</p>
                      <p className="text-sm text-gray-400">Start Date: {new Date(insurance.start_date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-400">End Date: {new Date(insurance.end_date).toLocaleDateString()}</p>
                      <div className="mt-2 flex justify-between">
                        <button onClick={() => handleEditInsurance(insurance)} className="px-2 py-1 bg-blue-600 text-white rounded">Edit</button>
                        <button onClick={() => handleDeleteInsurance(insurance.policy_number)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No insurance services available</p>
              )}
            </div>
          )}
          {activeTab === 'maintenance' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Maintenance Services</h3>
              {maintenances.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {maintenances.map((maintenance) => (
                    <div key={maintenance.maintenance_id} className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold">Service Date: {new Date(maintenance.service_date).toLocaleDateString()}</h4>
                      <p>{maintenance.service_description}</p>
                      <p className="text-sm text-gray-400">Cost: ${maintenance.cost}</p>
                      <p className="text-sm text-gray-400">Service Center: {maintenance.service_center}</p>
                      <p className="text-sm text-gray-400">Appointment: {new Date(maintenance.appointment_date).toLocaleDateString()} at {maintenance.appointment_time}</p>
                      <div className="mt-2 flex justify-between">
                        <button onClick={() => handleEditMaintenance(maintenance)} className="px-2 py-1 bg-blue-600 text-white rounded">Edit</button>
                        <button onClick={() => handleDeleteMaintenance(maintenance.maintenance_id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No maintenance services available</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Post Modal */}
      {isPostModalOpen && editPostData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-900 p-4 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Post</h3>
            <div className="space-y-2">
              <input
                type="number"
                value={editPostData.vehicle_price}
                onChange={(e) => setEditPostData({ ...editPostData, vehicle_price: e.target.value })}
                placeholder="Price"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <textarea
                value={editPostData.vehicle_description}
                onChange={(e) => setEditPostData({ ...editPostData, vehicle_description: e.target.value })}
                placeholder="Description"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="text"
                value={editPostData.vehicle_image}
                onChange={(e) => setEditPostData({ ...editPostData, vehicle_image: e.target.value })}
                placeholder="Image URL"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setIsPostModalOpen(false)} className="px-4 py-2 bg-gray-600 text-white rounded">Cancel</button>
              <button onClick={handleUpdatePost} className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Insurance Modal */}
      {isInsuranceModalOpen && editInsuranceData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-900 p-4 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Insurance</h3>
            <div className="space-y-2">
              <input
                type="number"
                value={editInsuranceData.coverage_amount}
                onChange={(e) => setEditInsuranceData({ ...editInsuranceData, coverage_amount: e.target.value })}
                placeholder="Coverage Amount"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="date"
                value={editInsuranceData.start_date.split('T')[0]}
                onChange={(e) => setEditInsuranceData({ ...editInsuranceData, start_date: e.target.value })}
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="date"
                value={editInsuranceData.end_date.split('T')[0]}
                onChange={(e) => setEditInsuranceData({ ...editInsuranceData, end_date: e.target.value })}
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="number"
                value={editInsuranceData.services_service_id}
                onChange={(e) => setEditInsuranceData({ ...editInsuranceData, services_service_id: e.target.value })}
                placeholder="Service ID"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="number"
                value={editInsuranceData.vehicle_v_id}
                onChange={(e) => setEditInsuranceData({ ...editInsuranceData, vehicle_v_id: e.target.value })}
                placeholder="Vehicle ID"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setIsInsuranceModalOpen(false)} className="px-4 py-2 bg-gray-600 text-white rounded">Cancel</button>
              <button onClick={handleUpdateInsurance} className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Maintenance Modal */}
      {isMaintenanceModalOpen && editMaintenanceData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-900 p-4 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Maintenance</h3>
            <div className="space-y-2">
              <input
                type="date"
                value={editMaintenanceData.service_date.split('T')[0]}
                onChange={(e) => setEditMaintenanceData({ ...editMaintenanceData, service_date: e.target.value })}
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <textarea
                value={editMaintenanceData.service_description}
                onChange={(e) => setEditMaintenanceData({ ...editMaintenanceData, service_description: e.target.value })}
                placeholder="Service Description"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="number"
                value={editMaintenanceData.cost}
                onChange={(e) => setEditMaintenanceData({ ...editMaintenanceData, cost: e.target.value })}
                placeholder="Cost"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="text"
                value={editMaintenanceData.service_center}
                onChange={(e) => setEditMaintenanceData({ ...editMaintenanceData, service_center: e.target.value })}
                placeholder="Service Center"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="number"
                value={editMaintenanceData.services_service_id}
                onChange={(e) => setEditMaintenanceData({ ...editMaintenanceData, services_service_id: e.target.value })}
                placeholder="Service ID"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="number"
                value={editMaintenanceData.vehicle_v_id}
                onChange={(e) => setEditMaintenanceData({ ...editMaintenanceData, vehicle_v_id: e.target.value })}
                placeholder="Vehicle ID"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="date"
                value={editMaintenanceData.appointment_date.split('T')[0]}
                onChange={(e) => setEditMaintenanceData({ ...editMaintenanceData, appointment_date: e.target.value })}
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="time"
                value={editMaintenanceData.appointment_time}
                onChange={(e) => setEditMaintenanceData({ ...editMaintenanceData, appointment_time: e.target.value })}
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="text"
                value={editMaintenanceData.service_location}
                onChange={(e) => setEditMaintenanceData({ ...editMaintenanceData, service_location: e.target.value })}
                placeholder="Service Location"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <textarea
                value={editMaintenanceData.additional_details}
                onChange={(e) => setEditMaintenanceData({ ...editMaintenanceData, additional_details: e.target.value })}
                placeholder="Additional Details"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setIsMaintenanceModalOpen(false)} className="px-4 py-2 bg-gray-600 text-white rounded">Cancel</button>
              <button onClick={handleUpdateMaintenance} className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

