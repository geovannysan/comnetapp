import UserSlice from "./Slice/UserSlice";
import { configureStore } from "@reduxjs/toolkit";

export const stores = configureStore({
    reducer:{
        usuario:UserSlice,
    }
})