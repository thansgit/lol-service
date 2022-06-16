import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from "../../../utils/baseURL";

const commentResetUpdateAction = createAction('comment/resetUpdate');

//Create
export const commentCreateAction = createAsyncThunk(
    'comment/create',
    async (comment, { rejectWithValue, getState, dispatch }) => {
        //Get user token
        const user = getState()?.users;
        const { userAuth } = user;

        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        };
        //Http call
        try {
            const { data } = await axios.post(`${baseURL}/api/comments`, {
                description: comment?.description,
                postId: comment?.postId
            }, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    });
//Delete
export const commentDeleteAction = createAsyncThunk(
    'comment/delete',
    async (commentId, { rejectWithValue, getState, dispatch }) => {
        //Get user token
        const user = getState()?.users;
        const { userAuth } = user;

        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        };
        //Http call
        try {
            const { data } = await axios.delete(`${baseURL}/api/comments/${commentId}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    });

//Update
export const commentUpdateAction = createAsyncThunk(
    'comment/update',
    async (comment, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;

        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        };

        try {
            const { data } = await axios.put(`${baseURL}/api/comments/${comment?.id}`,
                { description: comment?.description },
                config,
            );
            dispatch(commentResetUpdateAction());
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }

    }
);

//Fetch a single comment
export const commentFetchSingleAction = createAsyncThunk(
    'comment/fetchsingle',
    async (id, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;

        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        };

        try {
            const { data } = await axios.get(`${baseURL}/api/comments/${id}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }

    }
);

const commentSlices = createSlice({
    name: 'comment',
    initialState: {},
    extraReducers: (builder) => {
        //Create
        builder.addCase(commentCreateAction.pending,
            (state, action) => {
                state.loading = true;
            });
        builder.addCase(commentCreateAction.fulfilled,
            (state, action) => {
                state.loading = false;
                state.commentCreated = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        builder.addCase(commentCreateAction.rejected,
            (state, action) => {
                state.loading = false;
                state.commentCreated = undefined;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });

        //Delete
        builder.addCase(commentDeleteAction.pending,
            (state, action) => {
                state.loading = true;
            });
        builder.addCase(commentDeleteAction.fulfilled,
            (state, action) => {
                state.loading = false;
                state.commentDeleted = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        builder.addCase(commentDeleteAction.rejected,
            (state, action) => {
                state.loading = false;
                state.commentDeleted = undefined;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });

        //Update
        builder.addCase(commentUpdateAction.pending,
            (state, action) => {
                state.loading = true;
            });
        builder.addCase(commentUpdateAction.fulfilled,
            (state, action) => {
                state.loading = false;
                state.commentUpdated = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        builder.addCase(commentUpdateAction.rejected,
            (state, action) => {
                state.loading = false;
                state.commentUpdated = undefined;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });

        //Fetch a single comment
        builder.addCase(commentFetchSingleAction.pending,
            (state, action) => {
                state.loading = true;
            });
        builder.addCase(commentResetUpdateAction,
            (state, action) => {
                state.isUpdated = true;
            });
        builder.addCase(commentFetchSingleAction.fulfilled,
            (state, action) => {
                state.loading = false;
                state.commentFetched = action?.payload;
                state.isUpdated = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        builder.addCase(commentFetchSingleAction.rejected,
            (state, action) => {
                state.loading = false;
                state.commentFetched = undefined;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });

    }
});



export default commentSlices.reducer;