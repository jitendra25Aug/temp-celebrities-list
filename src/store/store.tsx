import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user_slice";
import uiSlice from "./ui_slice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        ui: uiSlice.reducer
    }
})