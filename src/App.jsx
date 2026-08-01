// Main App Component for Experiment 2
import React from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import ShortPosts from './components/ShortPosts';

function App() {
  return (
    <div className="container">
      {/* College Experiment Header */}
      <header style={{ marginBottom: '20px', borderBottom: '2px solid black', paddingBottom: '10px' }}>
        <h1>Redux-Based Content State Management</h1>
      </header>

      {/* Main Content Area */}
      <main>
        {/* Form component to add new posts */}
        <PostForm />

        {/* Component to list all posts */}
        <PostList />

        {/* Component to list filtered short posts */}
        <ShortPosts />
      </main>
    </div>
  );
}

export default App;
