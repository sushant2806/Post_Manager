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
      // sample posts as requested
     const samplePosts = [
      {
        id: 1,
        title: "Morning Coffee",
        content: "Starting my day with a hot cup of coffee.",
        platform: "Twitter",
      },
      {
        id: 2,
        title: "React Practice",
        content: "Today I learned Redux Toolkit and created my first global state management project.",
        platform: "LinkedIn",
      },
      {
        id: 3,
        title: "Sunset View",
        content: "Beautiful sunset at the beach with friends.",
        platform: "Instagram",
      },
      {
        id: 4,
        title: "Weekend Plans",
        content: "Planning a short trip this weekend to relax and enjoy nature.",
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
