import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

let VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchFavoriteQuote = createAsyncThunk(
    "favoriteQuote/fetch",
    async (userId, { rejectWithValue }) => {

        try {
            // console.log("Fetching favorite quotes for user:", userId);
            const response = await axios.get(VITE_API_URL + "/quotes",
                {
                    params: { userId: userId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                    secure: true,
                }
            );
            const favoriteQuotes = response.data.data;
            // console.log("favoriteQuotes", favoriteQuotes);

            localStorage.setItem("favoriteQuotes", JSON.stringify(favoriteQuotes));

            return favoriteQuotes;
        } catch (error) {
            // console.error("Error fetching favorite quotes:", error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const saveFavoriteQuote = createAsyncThunk(
    "favoriteQuote/save",
    async ({ quote, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                VITE_API_URL + "/quotes",
                { ...quote, userId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                    secure: true,
                }
            );

            // Ensure response contains the quote data
            if (!response.data || !response.data.data) {
                throw new Error("Invalid response from server");
            }

            // Update local storage
            const currentQuotes = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];
            const updatedQuotes = [...currentQuotes, response.data];
            localStorage.setItem("favoriteQuotes", JSON.stringify(updatedQuotes));

            toast.success("Quote saved successfully!");

            return updatedQuotes; // Return the updated quotes
        } catch (error) {
            let errorMessage = "An unknown error occurred.";

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    errorMessage = error.response.data?.message || "An error occurred while saving the quote.";
                } else if (error.request) {
                    errorMessage = "No response from server. Please try again.";
                }
            } else {
                errorMessage = error.message;
            }

            toast.error(errorMessage);

            return rejectWithValue(errorMessage);
        }
    }
);

export const removeFavoriteQuote = createAsyncThunk(
    "favoriteQuote/remove",
    async (quoteId, { rejectWithValue }) => {
        try {
            console.log("Removing quote:", quoteId);

            await axios.delete(VITE_API_URL + `/quotes/${quoteId}`,
                {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                withCredentials: true,
                secure: true,
            });

            // Update local storage after successful deletion
            let currentQuotes = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];
            const updatedQuotes = currentQuotes.filter((quote) => quote.id !== quoteId);
            localStorage.setItem("favoriteQuotes", JSON.stringify(updatedQuotes));

            toast.success("Quote removed successfully!");

            return updatedQuotes; // Return updated list
        } catch (error) {
            let errorMessage = "An unknown error occurred.";

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    errorMessage = error.response.data?.message || "Failed to remove the quote.";
                } else if (error.request) {
                    errorMessage = "No response from server. Please try again.";
                }
            } else {
                errorMessage = error.message;
            }

            toast.error(errorMessage); // Show error notification

            return rejectWithValue(errorMessage);
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
                toast.error(action.payload);
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