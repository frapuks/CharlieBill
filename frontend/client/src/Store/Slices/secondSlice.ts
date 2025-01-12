import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    second: [],
};

const secondSlice = createSlice({
    name: "second",
    initialState,
    reducers: {
        setSecond: (state, action) => {
            state.second = action.payload;
        },
    },
});

export const { setSecond } = secondSlice.actions;
export default secondSlice.reducer;