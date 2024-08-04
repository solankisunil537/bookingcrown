// app/store.js
import { configureStore } from '@reduxjs/toolkit';
    import BookingsReducer from "../features/bookings/BookingSlice"

    export const store = configureStore({
        reducer: {
            bookings: BookingsReducer,
        },
    });
