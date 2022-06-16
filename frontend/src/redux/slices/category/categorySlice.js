import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from "../../../utils/baseURL";

//Actions for navigation implementation after actions
const categoryResetUpdateAction = createAction('category/resetUpdate');
const categoryResetDeleteAction = createAction('category/resetDelete');
const categoryResetCreateAction = createAction('category/resetCreate');


export const categoryCreateAction = createAsyncThunk(
    'category/create',
    async (category, { rejectWithValue, getState, dispatch }) => {
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
            const { data } = await axios.post(`${baseURL}/api/categories`, {
                title: category?.title,
            }, config);
            dispatch(categoryResetCreateAction());
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    });
//Fetch all categories
export const categoriesFetchAction = createAsyncThunk(
    'category/fetchall',
    async (category, { rejectWithValue, getState, dispatch }) => {
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
            const { data } = await axios.get(`${baseURL}/api/categories`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    });
//Fetch a single category
export const categoryFetchAction = createAsyncThunk(
    'category/fetchsingle',
    async (id, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        };
        try {
            const { data } = await axios.get(`${baseURL}/api/categories/${id}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        };
    }
);
//Update category
export const categoryUpdateAction = createAsyncThunk(
    'category/update',
    async (category, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        };
        try {
            const { data } = await axios.put(
                `${baseURL}/api/categories/${category?.id}`,
                { title: category?.title },
                config
            );

            //Dispatch action to reset the updated data
            dispatch(categoryResetUpdateAction());
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
//Delete category
export const categoryDeleteAction = createAsyncThunk(
    'category/delete',
    async (id, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        };
        try {
            const { data } = await axios.delete(`${baseURL}/api/categories/${id}`, config);
            //Dispatch action to reset the updated data
            dispatch(categoryResetDeleteAction());
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//Slices
const categorySlices = createSlice({
    name: 'category',
    initialState: {},
    extraReducers: (builder) => {
        //Create
        builder.addCase(categoryCreateAction.pending,
            (state, action) => {
                state.loading = true;
            });

        //Dispatch action for Navigate
        builder.addCase(categoryResetCreateAction,
            (state, action) => {
                state.isCreated = true;
            });
        builder.addCase(categoryCreateAction.fulfilled,
            (state, action) => {
                state.category = action?.payload;
                state.isCreated = false;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        builder.addCase(categoryCreateAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });

        //Fetch all categories
        builder.addCase(categoriesFetchAction.pending,
            (state, action) => {
                state.loading = true;
            });
        builder.addCase(categoriesFetchAction.fulfilled,
            (state, action) => {
                state.categoryList = action?.payload;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        builder.addCase(categoriesFetchAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });

        //Fetch single category
        builder.addCase(categoryFetchAction.pending,
            (state, action) => {
                state.loading = true;
            });
        builder.addCase(categoryFetchAction.fulfilled,
            (state, action) => {
                state.category = action?.payload;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        builder.addCase(categoryFetchAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });

        //Update
        builder.addCase(categoryUpdateAction.pending,
            (state, action) => {
                state.loading = true;
            });
        //Dispatch action for Navigate
        builder.addCase(categoryResetUpdateAction,
            (state, action) => {
                state.isUpdated = true;
            });
        builder.addCase(categoryUpdateAction.fulfilled,
            (state, action) => {
                state.updatedCategory = action?.payload;
                state.isUpdated = false;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        builder.addCase(categoryUpdateAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });

        //Delete
        builder.addCase(categoryDeleteAction.pending,
            (state, action) => {
                state.loading = true;
            });
        //Dispatch action for Navigate
        builder.addCase(categoryResetDeleteAction,
            (state, action) => {
                state.isDeleted = true;
            });
        builder.addCase(categoryDeleteAction.fulfilled,
            (state, action) => {
                state.deletedCategory = action?.payload;
                state.isDeleted = false;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
        builder.addCase(categoryDeleteAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });
    }
});


export default categorySlices.reducer;