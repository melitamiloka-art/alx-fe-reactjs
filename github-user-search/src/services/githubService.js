import axios from "axios";

const BASE_URL = "https://api.github.com";


export const fetchUserData = async (username) => {
  const res = await axios.get(`${BASE_URL}/users/${username}`);
  return res.data;
};


export const searchUsers = async ({ username, location, minRepos }) => {
  let query = "";
  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos} `;
  
  const res = await axios.get(`${BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=10`);
  return res.data.items; 
};