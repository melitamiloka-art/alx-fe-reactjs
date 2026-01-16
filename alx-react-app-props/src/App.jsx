import React, { useState } from 'react';
import UserProfile from './components/UserProfile';
import UserContext from './UserContext';

function App() {
  const [count, setCount] = useState(0);


  const userData = {
    name: "Alice",
    age: 25,
    bio: "Loves hiking and photography"
  };

  return (
    <>
      
      <UserContext.Provider value={userData}>
        <UserProfile />
      </UserContext.Provider>

      <div className="card">
        <button onClick={() => setCount(count + 1)}>count is {count}</button>
      </div>
    </>
  );
}

export default App;