import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when starting the API call
    setError('');
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data); // Set the user data
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);  // Set loading to false when the API call finishes
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}  {/* Show loading indicator */}
      {error && <p className="error">{error}</p>}  {/* Show error message if needed */}

      {userData && (
        <div className="user-profile">
          <img src={userData.avatar_url} alt="Avatar" />
          <h2>{userData.name}</h2>
          <p>@{userData.login}</p>  {/* Add the login (GitHub username) */}
          <p>{userData.bio}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;