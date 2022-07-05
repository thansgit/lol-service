import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from "../../../utils/baseURL";

const emailResetSendAction = createAction('email/resetSend');

//Register actions
export const emailSendAction = createAsyncThunk(
    'email/send',
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
                `${baseURL}/api/email`,
                {
                    toEmail: email?.toEmail,
                    subject: email?.subject,
                    message: email?.message,
                },
                config
            );
            dispatch(emailResetSendAction());
            return data;
        } catch (error) {
            //Same as !error && !error.response
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    });


const emailSlices = createSlice({
    name: "email",
    initialState: {},
    extraReducers: builder => {
        builder.addCase(emailSendAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(emailResetSendAction, (state,action) => {
            state.isEmailSent = true;
        })
        builder.addCase(emailSendAction.fulfilled, (state, action) => {
            state.loading = false;
            state.mailSent = action?.payload;
            state.isEmailSent = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(emailSendAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

    }
});

export default emailSlices.reducer;