import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet, useParams, Navigate } from 'react-router-dom';


const isAuthenticated = false;


const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};


const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li><Link to="/profile">Go to Profile</Link></li>
          <li><Link to="/post/1">Go to Post 1</Link></li>
          <li><Link to="/post/2">Go to Post 2</Link></li>
        </ul>
      </nav>
    </div>
  );
};


const Profile = () => {
  return (
    <div>
      <h2>Profile Page</h2>
      <nav>
        <ul>
          <li><Link to="details">Profile Details</Link></li>
          <li><Link to="settings">Profile Settings</Link></li>
        </ul>
      </nav>
      <Outlet /> 
    </div>
  );
};


const ProfileDetails = () => {
  return <h3>Profile Details</h3>;
};


const ProfileSettings = () => {
  return <h3>Profile Settings</h3>;
};


const Post = () => {
  const { postId } = useParams(); 
  return (
    <div>
      <h2>Blog Post {postId}</h2>
      <p>This is the content of blog post {postId}</p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />

        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>

       
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;