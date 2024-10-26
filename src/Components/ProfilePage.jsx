import React from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const user = {
    username: 'JohnDoe',
    phone: '123-456-7890',
    posts: 5,
    comments: 10,
    history: ['Post 1', 'Post 2', 'Post 3'],
    profilePic: null, // Change to a URL if you have a profile picture
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-pic">
          {user.profilePic ? (
            <img src={user.profilePic} alt={`${user.username}'s profile`} />
          ) : (
            <span>{user.username.charAt(0)}</span>
          )}
        </div>
        <div className="profile-info">
          <h2>{user.username}</h2>
          <p>{user.phone}</p>
        </div>
        <button className="logout-button">Logout</button> {/* Add Logout button */}
      </div>
      <div className="profile-content">
        <div className="stats">
          <div className="stat-item">
            <h3>Posts</h3>
            <p>{user.posts}</p>
          </div>
          <div className="stat-item">
            <h3>Comments</h3>
            <p>{user.comments}</p>
          </div>
        </div>
        <div className="history">
          <h3>History</h3>
          <ul>
            {user.history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
