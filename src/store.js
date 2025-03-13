import { configureStore } from "@reduxjs/toolkit";
import quoteReducer from "./features/quoteSlice";
import favoriteQuoteReducer from "./features/favoriteQuoteSlice";

export const store = configureStore({
    reducer: {
        quote: quoteReducer,
        favourite: favoriteQuoteReducer
        // auth: authReducer
    }
});