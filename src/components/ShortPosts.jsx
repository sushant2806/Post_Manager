// React component to display short posts (< 100 characters)
import React from 'react';
import { useSelector } from 'react-redux';
import { selectShortPosts } from '../store/selectors/postSelectors';

function ShortPosts() {
  // Retrieve filtered list of short posts using our custom createSelector
  const shortPosts = useSelector(selectShortPosts);

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
      <h2>Short Posts (&lt; 100 Characters)</h2>
      <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '16px' }}>
        <em>Filtered dynamically using Redux <code>createSelector</code> memoized computation.</em>
      </p>

      {shortPosts.length === 0 ? (
        <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No short posts found (all posts are 100+ characters).</p>
      ) : (
        <div>
          {shortPosts.map((post) => (
            <div key={post.id} className="short-post-card">
              <div className="short-post-header">
                <div>
                  <strong style={{ fontSize: '0.98rem', marginRight: '8px' }}>{post.title}</strong>
                  <span className={getBadgeClass(post.platform)}>{post.platform}</span>
                </div>
                <span className="char-count">{post.content.length} chars</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#374151' }}>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShortPosts;
