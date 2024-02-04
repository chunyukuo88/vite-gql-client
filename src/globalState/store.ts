import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from './companiesSlice.ts'
import authReducer from './auth/authSlice.ts';

export const store = configureStore({
    reducer: {
        companies: companiesReducer,
        auth: authReducer,
    },
    devTools: true,
});
