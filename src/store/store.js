// Import configureStore from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
// Import the postReducer from postSlice
import postReducer from './slices/postSlice';

// Create and export the main Redux store
export const store = configureStore({
  reducer: {
    // Only one slice registered as requested
    posts: postReducer,
  },
});
