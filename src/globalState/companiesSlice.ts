import { createSlice } from '@reduxjs/toolkit';

export const companiesSlice = createSlice({
    name: 'companies',
    initialState: {
        value: [],
    },
    reducers: {
        updateCompanies: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const selectCompanies = (state) => state.language.value;
export const { updateCompanies } = companiesSlice.actions;

export default companiesSlice.reducer;
