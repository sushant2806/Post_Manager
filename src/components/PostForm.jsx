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
      title: title,
      content: content,
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
      <h2>Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
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

          {/* Platform Dropdown */}
          <div className="form-group">
            <label>Platform:</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option value="Twitter">Twitter</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
            </select>
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
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}

export default PostForm;
