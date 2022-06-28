import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from "../../../utils/baseURL";
const userResetUpdateAction = createAction('user/resetUpdateAction');
//Register actions
export const userRegisterAction = createAsyncThunk(
    'users/register',
    async (user, { rejectWithValue, getState, dispatch }) => {
        try {
            //Http call
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                `${baseURL}/api/users/register`,
                user,
                config,
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

//Fetch profile
export const userFetchProfileAction = createAsyncThunk(
    'users/fetchprofile',
    async (id, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        };
        try {
            const { data } = await axios.get(`${baseURL}/api/users/profile/${id}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//Follow profile
export const userFollowProfileAction = createAsyncThunk(
    'users/followprofile',
    async (userToFollowId, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        };
        try {
            const { data } = await axios.put(
                `${baseURL}/api/users/follow`,
                { followId: userToFollowId },
                config
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

// Unfollow profile
export const userUnfollowProfileAction = createAsyncThunk(
    "user/unfollowprofile",
    async (unFollowId, { rejectWithValue, getState, dispatch }) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };
        //http call
        try {
            const { data } = await axios.put(
                `${baseURL}/api/users/unfollow`,
                { unFollowId },
                config
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//Update profile photo action
export const userUploadProfilePhotoAction = createAsyncThunk(
    'users/uploadprofilephoto',
    async (profileImg, { rejectWithValue, getState, dispatch }) => {
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
            formData.append('image', profileImg?.image);

            const { data } = await axios.put(`${baseURL}/api/users/profilephoto-upload`, formData, config);
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        };
    });

//Update profile action
export const userUpdateAction = createAsyncThunk(
    'users/update',
    async (userData, { rejectWithValue, getState, dispatch }) => {

        //Get the userData token for headers
        const { userAuth } = getState()?.users;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };

        try {
            //Http call
            const { data } = await axios.put(`${baseURL}/api/users`,
                {
                    nickName: userData?.nickName,
                    email: userData?.email,
                    bio: userData?.bio
                }, config);

            dispatch(userResetUpdateAction());
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        };
    });

//Login actions
export const userLoginAction = createAsyncThunk(
    'users/login',
    async (userData, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            //Make http call
            const { data } = await axios.post(
                `${baseURL}/api/users/login`,
                userData,
                config
            );
            //Save user into local storage
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//Logout action
export const userLogoutAction = createAsyncThunk(
    '/user/logout',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            localStorage.removeItem('userInfo');
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//Get user from localstorage and place into store
const userLoginFromLocalStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) : null;

//Slices
const usersSlices = createSlice({
    name: 'users',
    initialState: {
        userAuth: userLoginFromLocalStorage,
    },
    extraReducers: (builder) => {
        //Register
        builder.addCase(userRegisterAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userRegisterAction.fulfilled, (state, action) => {
            state.loading = false;
            state.registered = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userRegisterAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //Update user (profile)
        builder.addCase(userUpdateAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(userResetUpdateAction, (state, action) => {
            state.userIsUpdated = true;
        })
        builder.addCase(userUpdateAction.fulfilled, (state, action) => {
            state.loading = false;
            state.updated = action?.payload;
            state.userIsUpdated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userUpdateAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //Login
        builder.addCase(userLoginAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userLoginAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userLoginAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //Logout
        builder.addCase(userLogoutAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(userLogoutAction.fulfilled, (state, action) => {
            state.userAuth = undefined;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userLogoutAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });

        //Fetch profile
        builder.addCase(userFetchProfileAction.pending, (state, action) => {
            state.profileLoading = true;
        });
        builder.addCase(userFetchProfileAction.fulfilled, (state, action) => {
            state.profile = action?.payload;
            state.profileLoading = false;
            state.profileAppErr = undefined;
            state.profileServerErr = undefined;
        });
        builder.addCase(userFetchProfileAction.rejected, (state, action) => {
            state.profileAppErr = action?.payload?.message;
            state.profileServerErr = action?.error?.message;
            state.profileLoading = false;
        });

        //user Follow
        builder.addCase(userFollowProfileAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userFollowProfileAction.fulfilled, (state, action) => {
            state.loading = false;
            state.followed = action?.payload;
            state.unFollowed = undefined;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userFollowProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.unFollowed = undefined;
            state.serverErr = action?.error?.message;
        });

        //user unFollow
        builder.addCase(userUnfollowProfileAction.pending, (state, action) => {
            state.unfollowLoading = true;
            state.unFollowedAppErr = undefined;
            state.unfollowServerErr = undefined;
        });
        builder.addCase(userUnfollowProfileAction.fulfilled, (state, action) => {
            state.unfollowLoading = false;
            state.unFollowed = action?.payload;
            state.followed = 'undefined';
            state.unFollowedAppErr = undefined;
            state.unfollowServerErr = undefined;
        });
        builder.addCase(userUnfollowProfileAction.rejected, (state, action) => {
            state.unfollowLoading = false;
            state.unFollowedAppErr = action?.payload?.message;
            state.unfollowServerErr = action?.error?.message;
        });

        //Upload profile photo
        builder.addCase(userUploadProfilePhotoAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(userUploadProfilePhotoAction.fulfilled, (state, action) => {
            state.profilePhoto = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userUploadProfilePhotoAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });

    },
});

export default usersSlices.reducer;