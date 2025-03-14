import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFavoriteQuote = createAsyncThunk(
    "favoriteQuote/fetch",
    async (_, { rejectWithValue }) => {

        try {
            const response = await axios.get('api/quotes',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            const favoriteQuotes = response.data.data;
            // console.log("favoriteQuotes", favoriteQuotes);

            localStorage.setItem("favoriteQuotes", JSON.stringify(favoriteQuotes));

            return favoriteQuotes;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const saveFavoriteQuote = createAsyncThunk(
    "favoriteQuote/save",
    async ({quote, userId}, { rejectWithValue }) => {
        try {
            console.log("quote", quote);
            await axios.post('api/quotes',
                { ...quote, userId: userId }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const currentQuotes = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];
            const updateQuotes = [...currentQuotes, quote];
            localStorage.setItem("favoriteQuotes", JSON.stringify(updateQuotes));
            console.log("qoute saved");
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
            await axios.delete(`${'api/quotes'}/${quote.id}`);
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
        favoriteQuotes: [],
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
                state.favoriteQuotes = action.payload;
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
                state.favoriteQuotes = action.payload;
            })
            .addCase(saveFavoriteQuote.rejected, (state, action) => {
                state.loading = false;
                state.error = [...state.favoriteQuotes, action.payload];
            })

            // Remove favorite quote
            .addCase(removeFavoriteQuote.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFavoriteQuote.fulfilled, (state, action) => {
                state.loading = false;
                state.favoriteQuotes = action.payload;
            })
            .addCase(removeFavoriteQuote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default favoriteQuoteSlice.reducer;