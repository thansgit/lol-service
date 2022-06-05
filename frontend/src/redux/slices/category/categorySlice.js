import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from "../../../utils/baseURL";


//Action
export const createCategoryAction = createAsyncThunk(
    'categories/create',
    async (category, { rejectWithValue, getState, dispatch }) => {
        //Get user token
        const user = getState()?.users;
        const { userAuth } = user;

        const config = {
            headers:{
                Authorization: `Bearer ${userAuth?.token}`
            }
        };
        //Http call
        try {
            const { data } = await axios.post(`${baseURL}/api/categories`, {
                title: category?.title,
            }, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    });

//Slices
const categorySlices = createSlice({
    name: 'category',
    initialState: {},
    extraReducers: (builder) => {
        builder.addCase(createCategoryAction.pending,
            (state, action) => {
                state.loading = true;
            });
        builder.addCase(createCategoryAction.fulfilled,
            (state, action) => {
                state.category = action?.payload;
                state.loading = false;
                //state.isCreated = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        builder.addCase(createCategoryAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });
    }
});


export default categorySlices.reducer;