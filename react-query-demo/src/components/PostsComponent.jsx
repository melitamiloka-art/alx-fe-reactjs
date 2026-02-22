import React from 'react';
import { useQuery } from 'react-query';


const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

function PostsComponent() {
 
  const { data, error, isLoading, isError, refetch } = useQuery('posts', fetchPosts, {
    
    staleTime: 1000 * 60 * 5, 
  });

  
  if (isLoading) return <div>Loading...</div>;

  
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;