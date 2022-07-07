import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from "../../../utils/baseURL";


//Action for redirect
const resetAccountVerifyToken = createAction('account/verify-reset');

//Create and send token to email
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
            dispatch(resetAccountVerifyToken());
            return data;
        } catch (error) {
            //Same as !error && !error.response
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    });

//Verify account with token
export const accountVerificationAction = createAsyncThunk(
    'account/verify',
    async (token, { rejectWithValue, getState, dispatch }) => {
        try {
            //Http call
            const user = getState()?.users;
            const { userAuth } = user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.token}`,
                },
            };
            const { data } = await axios.put(
                `${baseURL}/api/users/verify-account`,
                { token },
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


        builder.addCase(accountVerificationAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(resetAccountVerifyToken, (state, action) => {
            state.isVerified = true;
        });

        builder.addCase(accountVerificationAction.fulfilled, (state, action) => {
            state.loading = false;
            state.verified = action?.payload;
            state.isVerified = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(accountVerificationAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

    }
});

export default accountVerificationSlices.reducer;