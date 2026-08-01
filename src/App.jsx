// Main App Component for Experiment 2
import React from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import ShortPosts from './components/ShortPosts';

function App() {
  return (
    <div className="container">
      {/* Clean Header without 'Experiment 2 -' or 'Project Name:' prefixes */}
      <header>
        <h1>Simple Post Manager</h1>
        <h3>Redux-Based Content State Management</h3>
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
