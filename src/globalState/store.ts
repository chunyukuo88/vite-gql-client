import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from './companiesSlice.ts'

export const store = configureStore({
    reducer: {
        companies: companiesReducer
    }
});
