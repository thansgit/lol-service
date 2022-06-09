import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/users/usersSlices';
import categoriesReducer from '../slices/category/categorySlice';
import postsReducer from '../slices/posts/postSlices';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        category: categoriesReducer,
        post: postsReducer,
    },
});
