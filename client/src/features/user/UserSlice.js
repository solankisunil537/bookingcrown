import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance/AxiosInstance';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL
export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async () => {
        const response = await axiosInstance.get(`/getUserData`);
        return response.data;
    }
);

export const fetchAllUsers = createAsyncThunk(
    'user/fetchAllUsers',
    async () => {
        const response = await axios.get(baseUrl + '/getAllUsers');
        return response.data.allUsers;
    }
);

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        allUsers: [],
        user: {},
        status: 'idle',
        error: null,
    },
    reducers: {
        reset: (state) => {
            state.allUsers = [];
            state.user = {};
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch Single user
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Fetch list of allUsers
            .addCase(fetchAllUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allUsers = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const { reset } = UserSlice.actions;
export default UserSlice.reducer;
