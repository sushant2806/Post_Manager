// React component to display short posts (< 100 characters)
import React from 'react';
import { useSelector } from 'react-redux';
import { selectShortPosts } from '../store/selectors/postSelectors';

function ShortPosts() {
  // Retrieve filtered list of short posts using our custom createSelector
  const shortPosts = useSelector(selectShortPosts);

  return (
    <div className="section-box">
      <h2>Short Posts (Content Length &lt; 100 Characters)</h2>
      <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '12px' }}>
        
      </p>

      {shortPosts.length === 0 ? (
        <p style={{ color: '#6b7280' }}>No short posts found.</p>
      ) : (
        <ul style={{ paddingLeft: 0 }}>
          {shortPosts.map((post) => (
            <li key={post.id} className="short-post-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong>{post.title}</strong>
                <span className="platform-badge">{post.platform}</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>{post.content}</p>
              <small style={{ color: '#6b7280' }}>Length: {post.content.length} characters</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShortPosts;
