import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://127.0.0.1:8000/api/quotes";

export const fetchFavoriteQuote = createAsyncThunk(
    "favoriteQuote/fetch",
    async (_, { rejectWithValue }) => {
        const savedQuote = localStorage.getItem("favoriteQuote");
        if (savedQuote) return JSON.parse(savedQuote);

        try {
            const response = await axios.get(URL);
            const favoriteQuote = response.data;

            localStorage.setItem("favoriteQuote", JSON.stringify(favoriteQuote));

            return favoriteQuote;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const saveFavoriteQuote = createAsyncThunk(
    "favoriteQuote/save",
    async (quote, { rejectWithValue }) => {
        try {
            await axios.post(URL, quote);
            localStorage.setItem("favoriteQuote", JSON.stringify(quote));
            return quote;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const removeFavoriteQuote = createAsyncThunk(
    "favoriteQuote/remove",
    async (quote, { rejectWithValue }) => {
        try {
            await axios.delete(`${URL}/${quote.id}`);
            localStorage.removeItem("favoriteQuote");
            return null; // Returning null to reset state
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


const favoriteQuoteSlice = createSlice({
    name: "favoriteQuote",
    initialState: {
        favoriteQuote: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch favorite quote
            .addCase(fetchFavoriteQuote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavoriteQuote.fulfilled, (state, action) => {
                state.loading = false;
                state.favoriteQuote = action.payload;
            })
            .addCase(fetchFavoriteQuote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Save favorite quote
            .addCase(saveFavoriteQuote.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveFavoriteQuote.fulfilled, (state, action) => {
                state.loading = false;
                state.favoriteQuote = action.payload;
            })
            .addCase(saveFavoriteQuote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Remove favorite quote
            .addCase(removeFavoriteQuote.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFavoriteQuote.fulfilled, (state) => {
                state.loading = false;
                state.favoriteQuote = null;
            })
            .addCase(removeFavoriteQuote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default favoriteQuoteSlice.reducer;