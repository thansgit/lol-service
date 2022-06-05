import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from "../../../utils/baseURL";

//Register actions
export const registerUserAction = createAsyncThunk(
    'users/register',
    async (user, { rejectWithValue, getState, dispatch }) => {
        try {
            //Http call
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                `${baseURL}/api/users/register`,
                user,
                config,
            );
            return data;
        } catch (error) {
            //Same as !error && !error.response
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    });

//Login actions
export const loginUserAction = createAsyncThunk(
    'users/login',
    async (userData, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            //Make http call
            const { data } = await axios.post(
                `${baseURL}/api/users/login`,
                userData,
                config
            );
            //Save user into local storage
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//Logout action
export const logoutUserAction = createAsyncThunk(
    '/user/logout',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            localStorage.removeItem('userInfo');
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

//Get user from localstorage and place into store
const userLoginFromLocalStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) : null;

//Slices
const usersSlices = createSlice({
    name: 'users',
    initialState: {
        userAuth: userLoginFromLocalStorage,
    },
    extraReducers: (builder) => {
        //Register
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.registered = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //Login
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //Logout
        builder.addCase(logoutUserAction.pending, (state, action) => {
            state.loading = false;
        });
        builder.addCase(logoutUserAction.fulfilled, (state, action) => {
            state.userAuth = undefined;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(logoutUserAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });

    },
});

export default usersSlices.reducer;