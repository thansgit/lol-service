import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/users/usersSlices';
import categoriesReducer from '../slices/category/categorySlice';
import postsReducer from '../slices/posts/postSlices';
import commentsReducer from '../slices/comments/commentSlices';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        category: categoriesReducer,
        post: postsReducer,
        comment: commentsReducer,
    },
});
