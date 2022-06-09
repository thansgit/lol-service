import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from "../../../utils/baseURL";


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
            const { data } = await axios.post(`${baseURL}/api/posts`, post, config);
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
        builder.addCase(postCreateAction.pending,
            (state, action) => {
                state.loading = true;
            });
        builder.addCase(postCreateAction.fulfilled,
            (state, action) => {
                state.loading = false;
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
    },

});

export default postSlice.reducer;