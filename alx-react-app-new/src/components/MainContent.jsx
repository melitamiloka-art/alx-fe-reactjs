import React from 'react';

function MainContent() {
  return (
    <main
      style={{
        padding: '20px',
        backgroundColor: '#f4f4f4',
        minHeight: '300px'
      }}
    >
      <h2 style={{ color: '#333' }}>Welcome to the App</h2>
      <p style={{ lineHeight: '1.6' }}>
        I love to visit New York, Paris, and Tokyo.
      </p>
    </main>
  );
}

export default MainContent;