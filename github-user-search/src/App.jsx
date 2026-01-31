import { useState } from "react";
import Search from "./components/Search";
import { searchUsers } from "./services/githubService";
import Results from "./components/Results";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (params) => {
    setLoading(true);
    setError(false);
    try {
      const data = await searchUsers(params);
      setUsers(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">GitHub User Search</h1>
      <Search onSearch={handleSearch} />
      <Results users={users} loading={loading} error={error} />
    </div>
  );
}

export default App;