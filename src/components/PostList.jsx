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
      case 'Blog':
        return 'badge badge-blog';
      default:
        return 'badge';
    }
  };

  return (
    <div className="section-box post-list-section">
      {/* Section Header with Title, Count badge, and Sample Posts Button */}
      <div className="post-list-header">
        <div className="post-list-title-group">
          <h2 className="post-list-heading">All Posts</h2>
          <span className="count-pill">{posts.length}</span>
        </div>
        <button className="sample-posts-btn" onClick={handleFetchPosts} disabled={status === 'loading'}>
          ✨ Sample Posts
        </button>
      </div>

      {/* Show loading state */}
      {status === 'loading' && (
        <div className="loading-state" style={{ textAlign: 'center', padding: '20px 0', color: '#2563eb', fontWeight: 500 }}>
          <p>Loading sample posts...</p>
        </div>
      )}

      {/* Show error state */}
      {status === 'failed' && <p style={{ color: '#ef4444', marginBottom: '12px' }}>Error: {error}</p>}

      {/* Display empty state card if post list is empty (Image 2 style) */}
      {posts.length === 0 && status !== 'loading' ? (
        <div className="empty-posts-box">
          <div className="folder-icon-wrapper">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7C3 5.89543 3.89543 5 5 5H9.58579C10.1162 5 10.6249 5.21071 11 5.58579L12.4142 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="empty-title">No posts found</h3>
          <p className="empty-subtitle">
            Click the "✨ <strong>Sample Posts</strong>" button above to sample data, or add a custom post using the form above.
          </p>
        </div>
      ) : status !== 'loading' && posts.length > 0 ? (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th style={{ width: '8%' }}>ID</th>
                <th style={{ width: '25%' }}>Title</th>
                <th style={{ width: '40%' }}>Content</th>
                <th style={{ width: '15%' }}>Platform</th>
                <th style={{ width: '12%' }}>Action</th>
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
        </div>
      ) : null}
    </div>
  );
}

export default PostList;

