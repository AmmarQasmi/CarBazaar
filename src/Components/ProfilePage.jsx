import React from 'react';

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
    <div className="min-h-screen bg-gray-900 text-white p-5 grid grid-rows-[auto_1fr]">
      <div className="flex items-center mb-5 gap-4 justify-between">
        <div className="bg-red-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-4xl">
          {user.profilePic ? (
            <img src={user.profilePic} alt={`${user.username}'s profile`} className="rounded-full w-full h-full" />
          ) : (
            <span>{user.username.charAt(0)}</span>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{user.username}</h2>
          <p className="text-sm">{user.phone}</p>
        </div>
        <button className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition-colors">
          Logout
        </button>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex justify-around mb-5">
          <div className="bg-gray-800 p-4 rounded text-center flex-1 mr-4">
            <h3 className="text-lg font-medium">Posts</h3>
            <p className="text-2xl">{user.posts}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded text-center flex-1">
            <h3 className="text-lg font-medium">Comments</h3>
            <p className="text-2xl">{user.comments}</p>
          </div>
        </div>
        <div className="col-span-2 bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-medium">History</h3>
          <ul className="list-none p-0">
            {user.history.map((item, index) => (
              <li key={index} className="bg-red-500 my-2 p-2 rounded">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
