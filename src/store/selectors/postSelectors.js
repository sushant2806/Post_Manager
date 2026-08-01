// Import createSelector from Redux Toolkit
import { createSelector } from '@reduxjs/toolkit';
// Import selectAllPosts selector from postSlice
import { selectAllPosts } from '../slices/postSlice';

// ============================================================================
// REQUIREMENT: createSelector
// Selector to filter posts and return ONLY posts with content < 100 characters
// Reselect memoizes this computation so it only recalculates when posts change.
// ============================================================================
export const selectShortPosts = createSelector(
  [selectAllPosts], // Input selector
  (posts) => {
    // Return posts with content length less than 100 characters
    return posts.filter((post) => post.content.length < 100);
  }
);
