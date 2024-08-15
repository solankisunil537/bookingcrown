import { configureStore } from '@reduxjs/toolkit';
import BookingsReducer from "../features/bookings/BookingSlice"
import UserReducer from '../features/user/UserSlice';

export const store = configureStore({
    reducer: {
        bookings: BookingsReducer,
        user: UserReducer
    },
});
