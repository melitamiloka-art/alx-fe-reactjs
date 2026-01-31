import React, { useState } from "react";
import { searchUsers, fetchUserData } from "../services/githubService";

const Search = () => {
  
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  
  
  const [userData, setUserData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUserData([]);

    try {
      
      const users = await searchUsers({ username, location, minRepos });

      if (users.length === 0) {
        setError("No users found");
        setLoading(false);
        return;
      }

      
      const detailedUsers = await Promise.all(
        users.map(async (user) => {
          try {
            const details = await fetchUserData(user.login);
            return details;
          } catch {
            return user; 
          }
        })
      );

      setUserData(detailedUsers);
    } catch (err) {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">GitHub User Search</h1>

      
      <form
        onSubmit={handleSearch}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </form>

      
      {loading && <p className="mt-4 text-gray-700">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      
      {userData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full max-w-5xl">
          {userData.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-20 h-20 rounded-full mx-auto"
              />
              <h2 className="text-center font-bold mt-2">{user.name || user.login}</h2>
              <p className="text-center text-sm text-gray-600">@{user.login}</p>
              {user.location && (
                <p className="text-center text-sm mt-1">Location: {user.location}</p>
              )}
              <p className="text-center text-sm mt-1">
                Repositories: {user.public_repos ?? "N/A"}
              </p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-center text-blue-500 hover:underline"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;