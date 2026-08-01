// React component to display all posts from Redux store
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, deletePost, fetchPosts } from '../store/slices/postSlice';

const PostList = React.memo(function PostList() {
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

  return (
    <div className="section-box">
      <h2>All Posts</h2>

      {/* Button to test createAsyncThunk */}
      <button onClick={handleFetchPosts} style={{ marginBottom: '15px' }}>
        Fetch Sample Posts 
      </button>

      {/* Show loading state */}
      {status === 'loading' && <p style={{ color: '#2563eb', fontWeight: 500 }}>Loading posts </p>}

      {/* Show error state */}
      {status === 'failed' && <p style={{ color: '#dc2626' }}>Error: {error}</p>}

      {/* Display message if post list is empty */}
      {posts.length === 0 && status !== 'loading' ? (
        <p style={{ color: '#6b7280' }}>No posts available. Add one above or click 'Fetch Sample Posts'.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>Platform</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id}>
                <td>{index + 1}</td>
                <td><strong>{post.title}</strong></td>
                <td>{post.content}</td>
                <td>
                  <span className="platform-badge">{post.platform}</span>
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
});

export default PostList;
