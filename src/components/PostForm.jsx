// React component for creating a new post
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/slices/postSlice';

function PostForm() {
  const dispatch = useDispatch();

  // Local component state to store form inputs before adding to Redux
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('Twitter');

  const platforms = [
    { name: 'Twitter', key: 'twitter' },
    { name: 'LinkedIn', key: 'linkedin' },
    { name: 'Instagram', key: 'instagram' },
    { name: 'Facebook', key: 'facebook' },
    { name: 'Blog', key: 'blog' },
  ];

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation: ensure title and content are not empty
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content!');
      return;
    }

    // Create new post object
    const newPost = {
      id: Date.now().toString(), // Simple unique ID using current timestamp
      title: title.trim(),
      content: content.trim(),
      platform: platform,
    };

    // Dispatch addPost action to Redux store
    dispatch(addPost(newPost));

    // Reset local state form fields
    setTitle('');
    setContent('');
    setPlatform('Twitter');
  };

  return (
    <div className="section-box">
      <h2>✏️ Add New Post</h2>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            placeholder="e.g. My First Post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Platform Selector matching Image 1 */}
        <div className="form-group platform-container">
          <label className="platform-label">Platform:</label>
          <div className="platform-pills">
            {platforms.map((p) => {
              const isSelected = platform === p.name;
              return (
                <button
                  key={p.name}
                  type="button"
                  className={`platform-pill pill-${p.key} ${isSelected ? 'active' : ''}`}
                  onClick={() => setPlatform(p.name)}
                >
                  {p.name}
                  {isSelected && <span className="pill-check"> ✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Textarea */}
        <div className="form-group">
          <label>Content:</label>
          <textarea
            rows="3"
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button type="submit"> + Add Post</button>
      </form>
    </div>
  );
}

export default PostForm;

