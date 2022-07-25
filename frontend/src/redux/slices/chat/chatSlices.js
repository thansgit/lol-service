import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from "../../../utils/baseURL";


//Fetch all chats
export const chatsFetchAction = createAsyncThunk(
    'chats/fetchall',
    async (userId, { rejectWithValue, getState, dispatch }) => {
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
            const { data } = await axios.get(`${baseURL}/api/chat/${userAuth?._id}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    });

const chatSlices = createSlice({
    name: 'chat',
    initialState: {},
    extraReducers: (builder) => {

        //Fetch all chats
        builder.addCase(chatsFetchAction.pending,
            (state, action) => {
                state.loading = true;
            });
        builder.addCase(chatsFetchAction.fulfilled,
            (state, action) => {
                state.userChats = action?.payload;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        
        builder.addCase(chatsFetchAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });
    }
})


export default chatSlices.reducer;