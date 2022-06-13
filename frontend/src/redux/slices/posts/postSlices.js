import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from "../../../utils/baseURL";


//Actions for navigation implementation after actions
const postResetCreateAction = createAction('post/resetPostCreate');
const postResetUpdateAction = createAction('post/resetPostUpdate');

//Create a post action
export const postCreateAction = createAsyncThunk('post/create',
    async (post, { rejectWithValue, getState, dispatch }) => {
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

//Update a post action
export const postUpdateAction = createAsyncThunk('post/update',
    async (post, { rejectWithValue, getState, dispatch }) => {
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
            const { data } = await axios.put(`${baseURL}/api/posts/${post?.id}`, post, config);
            dispatch(postResetUpdateAction());
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        };
    });

//Fetch all posts
export const postFetchAllAction = createAsyncThunk('post/fetchall',
    async (category, { rejectWithValue, getState, dispatch }) => {

        try {
            //Fetch all from a specific category with query params.
            const { data } = await axios.get(`${baseURL}/api/posts?category=${category}`);
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        };
    });

//Fetch a single post
export const postFetchSingleAction = createAsyncThunk('post/fetchsingle',
    async (postId, { rejectWithValue, getState, dispatch }) => {

        try {
            //Http call
            const { data } = await axios.get(`${baseURL}/api/posts/${postId}`);
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        };
    });

//Add empathic votes to post
export const postToggleAddEmpathicVote = createAsyncThunk('post/addempathic',
    async (postId, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };

        try {
            const { data } = await axios.put(`${baseURL}/api/posts/empathicvote`, { postId }, config);
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }

    });
//Add egoic votes to post
export const postToggleAddEgoicVote = createAsyncThunk('post/addegoic',
    async (postId, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };

        try {
            const { data } = await axios.put(`${baseURL}/api/posts/egoicvote`, { postId }, config);
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }

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

        //Update post
        builder.addCase(postUpdateAction.pending,
            (state, action) => {
                state.loading = true;
            });
        //Dispatch action for Navigate
        builder.addCase(postResetUpdateAction,
            (state, action) => {
                state.isUpdated = true;
            });
        builder.addCase(postUpdateAction.fulfilled,
            (state, action) => {
                state.loading = false;
                state.isUpdated = false;
                state.postUpdated = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        builder.addCase(postUpdateAction.rejected,
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

        builder.addCase(postFetchSingleAction.pending,
            (state, action) => {
                state.loading = true;
            });
        builder.addCase(postFetchSingleAction.fulfilled,
            (state, action) => {
                state.postDetails = action?.payload;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        builder.addCase(postFetchSingleAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });

        //Add empathic vote   
        builder.addCase(postToggleAddEmpathicVote.pending,
            (state, action) => {
                state.loading = true;
            });
        builder.addCase(postToggleAddEmpathicVote.fulfilled,
            (state, action) => {
                state.empathicVotes = action?.payload;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        builder.addCase(postToggleAddEmpathicVote.rejected,
            (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });

        //Add egoic vote   
        builder.addCase(postToggleAddEgoicVote.pending,
            (state, action) => {
                state.loading = true;
            });
        builder.addCase(postToggleAddEgoicVote.fulfilled,
            (state, action) => {
                state.egoicVotes = action?.payload;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        builder.addCase(postToggleAddEgoicVote.rejected,
            (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });
    },

});

export default postSlice.reducer;