import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from "../../../utils/baseURL";


//Actions for navigation implementation after actions
const postResetCreateAction = createAction('post/resetPostCreate');

//Create a post action
export const postCreateAction = createAsyncThunk('post/create',
    async (post, { rejectWithValue, getState, dispatch }) => {
        console.log(post);
        //Get the user token for headers
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };

        try {
            //Http call
            const formData = new FormData();
            formData.append('title', post?.title);
            formData.append('description', post?.description);
            formData.append('category', post?.category?.label);
            formData.append('image', post?.image);

            const { data } = await axios.post(`${baseURL}/api/posts`, formData, config);
            dispatch(postResetCreateAction());
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        };
    });

//Fetch all posts
export const postFetchAllAction = createAsyncThunk('post/fetchall',
    async (post, { rejectWithValue, getState, dispatch }) => {

        try {
            //Http call
            const { data } = await axios.get(`${baseURL}/api/posts`);
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        };
    });


//Slices
const postSlice = createSlice({
    name: 'post',
    initialState: {},
    extraReducers: (builder) => {
        //Create post
        builder.addCase(postCreateAction.pending,
            (state, action) => {
                state.loading = true;
            });
        //Dispatch action for Navigate
        builder.addCase(postResetCreateAction,
            (state, action) => {
                state.isCreated = true;
            });
        builder.addCase(postCreateAction.fulfilled,
            (state, action) => {
                state.loading = false;
                state.isCreated = false;
                state.postCreated = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        builder.addCase(postCreateAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });

        //Fetch all posts    
        builder.addCase(postFetchAllAction.pending,
            (state, action) => {
                state.loading = true;
            });
        builder.addCase(postFetchAllAction.fulfilled,
            (state, action) => {
                state.postList = action?.payload;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        builder.addCase(postFetchAllAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });
    },

});

export default postSlice.reducer;