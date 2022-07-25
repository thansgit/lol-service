import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/users/usersSlices';
import categoriesReducer from '../slices/category/categorySlice';
import postsReducer from '../slices/posts/postSlices';
import commentsReducer from '../slices/comments/commentSlices';
import emailReducer from '../slices/email/emailSlices';
import accountVerificationReducer from "../slices/accountVerification/accountVerificationSlices";
import chatReducer from '../slices/chat/chatSlices';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        category: categoriesReducer,
        post: postsReducer,
        comment: commentsReducer,
        email: emailReducer,
        accountVerification: accountVerificationReducer,
        chats: chatReducer,
    },
});
