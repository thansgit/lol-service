import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from "../../../utils/baseURL";


//Register actions
export const accountVerificationSendTokenAction = createAsyncThunk(
    'account/token',
    async (email, { rejectWithValue, getState, dispatch }) => {
        try {
            //Http call
            const user = getState()?.users;
            const { userAuth } = user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.token}`,
                },
            };
            const { data } = await axios.post(
                `${baseURL}/api/users/generate-verify-email-token`,
                {},
                config
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


const accountVerificationSlices = createSlice({
    name: "account",
    initialState: {},
    extraReducers: builder => {
        builder.addCase(accountVerificationSendTokenAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(accountVerificationSendTokenAction.fulfilled, (state, action) => {
            state.loading = false;
            state.tokenSent = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(accountVerificationSendTokenAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

    }
});

export default accountVerificationSlices.reducer;