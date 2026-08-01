// React component to display all posts from Redux store
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, deletePost, fetchPosts } from '../store/slices/postSlice';

function PostList() {
  const dispatch = useDispatch();

  // Retrieve posts array from Redux store using selectAllPosts selector
  const posts = useSelector(selectAllPosts);

  // Retrieve status and error fields from state
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  // Function to handle post deletion
  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  // Function to handle fetching sample posts from simulated API
  const handleFetchPosts = () => {
    dispatch(fetchPosts());
  };

  // Helper to assign platform badge styles
  const getBadgeClass = (platform) => {
    switch (platform) {
      case 'Twitter':
        return 'badge badge-twitter';
      case 'LinkedIn':
        return 'badge badge-linkedin';
      case 'Instagram':
        return 'badge badge-instagram';
      case 'Facebook':
        return 'badge badge-facebook';
      default:
        return 'badge';
    }
  };

  return (
    <div className="section-box">
      <h2>All Posts ({posts.length})</h2>

      {/* Standard button without custom green styling */}
      <button onClick={handleFetchPosts} style={{ marginBottom: '16px' }}>
        Sample Posts
      </button>

      {/* Show loading state */}
      {status === 'loading' && <p style={{ color: '#2563eb', fontWeight: 500 }}>Loading sample posts...</p>}

      {/* Show error state */}
      {status === 'failed' && <p style={{ color: '#ef4444' }}>Error: {error}</p>}

      {/* Display message if post list is empty */}
      {posts.length === 0 && status !== 'loading' ? (
        <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No posts available. Add one above or click 'Sample Posts'.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th style={{ width: '8%' }}>ID</th>
              <th style={{ width: '25%' }}>Title</th>
              <th style={{ width: '42%' }}>Content</th>
              <th style={{ width: '15%' }}>Platform</th>
              <th style={{ width: '10%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td><code>{post.id}</code></td>
                <td><strong>{post.title}</strong></td>
                <td>{post.content}</td>
                <td>
                  <span className={getBadgeClass(post.platform)}>{post.platform}</span>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(post.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PostList;
