import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from "../../../utils/baseURL";


//Action

export const createCategoryAction = createAsyncThunk(
    'category/create',
    async (category, { rejectWithValue, getState, dispatch }) => {
        //Http call
        try {
            const { data } = await axios.post(`${baseURL}/api/
            category`, {
                title: category?.title,
            });
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    });