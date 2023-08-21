import { configureStore } from "@reduxjs/toolkit";
import bedroomReducer from "./features/bedroomsSlice";
import userReducer from "./features/userSlice";
import planSlice from "./features/planSlice";
import bookingsSlice from "./features/bookingSlice"

const store = configureStore({
    reducer:{
        bedrooms: bedroomReducer,
        users:userReducer,
        plans: planSlice,
        bookings: bookingsSlice
    },
});

export default store;