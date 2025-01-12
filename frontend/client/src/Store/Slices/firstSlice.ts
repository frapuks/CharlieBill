import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    first: [],
};

const firstSlice = createSlice({
    name: "first",
    initialState,
    reducers: {
        setFirst: (state, action) => {
            state.first = action.payload;
        },
    },
});

export const { setFirst } = firstSlice.actions;
export default firstSlice.reducer;