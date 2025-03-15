import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

let VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchQuote = createAsyncThunk("quote/fetchQuote", 
    async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${VITE_API_URL}/quotes/random`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            withCredentials: true,
            secure: true,
        });

        const data = response.data.data;
        // console.log(data);
        return data;
    } catch (error) {

        toast.error("An error occurred while fetching the quote.");
        console.log("Error fetching quote:", error);
        return rejectWithValue(error.message);
    }
});

const quoteSlice = createSlice({
    name: "quote",
    initialState: {
        quote: null,
        loading: false,
        error: null,
    },
    reducers: {},
    // handling async actions with createAsyncThunk
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuote.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchQuote.fulfilled, (state, action) => {
                state.loading = false;
                state.quote = action.payload;
            })
            .addCase(fetchQuote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });  
    },
});

export default quoteSlice.reducer;