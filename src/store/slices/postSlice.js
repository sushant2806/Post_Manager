// Import required functions from Redux Toolkit
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

// ============================================================================
// REQUIREMENT: createEntityAdapter
// Entity adapter manages posts in a normalized structure ({ ids: [], entities: {} })
// ============================================================================
export const postsAdapter = createEntityAdapter({
  selectId: (post) => post.id, // Primary key identifier
});

// Set up initial state with normalized posts state plus custom status and error fields
const initialState = postsAdapter.getInitialState({
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
});

// ============================================================================
// REQUIREMENT: createAsyncThunk
// Simulates an API call to fetch initial posts using setTimeout (no real backend)
// ============================================================================
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  // Return a promise that resolves after 1.5 seconds delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // 3 sample posts as requested
      const samplePosts = [
        {
          id: 1,
          title: "Morning",
          content: "Good morning everyone!",
          platform: "Twitter",
        },
        {
          id: 2,
          title: "Coffee",
          content: "Coffee makes every morning better.",
          platform: "Facebook",
        },
        {
          id: 3,
          title: "Workout",
          content: "Completed my morning workout.",
          platform: "Instagram",
        },
        {
          id: 4,
          title: "Sunset",
          content:
            "The sunset this evening painted the sky with beautiful shades of orange, pink, and purple. Sitting by the lake and watching the colors change slowly was the most relaxing part of my day.",
          platform: "Twitter",
        },
        {
          id: 5,
          title: "Travel",
          content: "Planning my next adventure.",
          platform: "Facebook",
        },
        {
          id: 6,
          title: "Weekend Getaway",
          content:
            "Spent the weekend exploring the mountains with friends. The fresh air, beautiful views, and peaceful atmosphere made it the perfect escape from the busy city life. Can't wait to visit again!",
          platform: "Facebook",
        },
      ];
resolve(samplePosts);
    }, 1500);
  });
});

// ============================================================================
// REQUIREMENT: createSlice
// Single slice managing post state, reducers, and extraReducers
// ============================================================================
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Reducer 1: addPost - Adds a single post into normalized state
    addPost: (state, action) => {
      postsAdapter.addOne(state, action.payload);
    },
    // Reducer 2: deletePost - Removes a post by ID from normalized state
    deletePost: (state, action) => {
      postsAdapter.removeOne(state, action.payload);
    },
  },
  // ============================================================================
  // REQUIREMENT: extraReducers
  // Handles pending, fulfilled, and rejected states of fetchPosts async thunk
  // ============================================================================
  extraReducers: (builder) => {
    builder
      // 1. Pending state: API fetch started
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // 2. Fulfilled state: API fetch succeeded
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // setAll replaces all posts in normalized state with payload
        postsAdapter.setAll(state, action.payload);
      })
      // 3. Rejected state: API fetch failed
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

// Export sync actions
export const { addPost, deletePost } = postSlice.actions;

// Export normalized adapter selectors for posts
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

// Export the reducer as default
export default postSlice.reducer;
