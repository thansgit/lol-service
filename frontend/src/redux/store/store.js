import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/users/usersSlices'

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
});
