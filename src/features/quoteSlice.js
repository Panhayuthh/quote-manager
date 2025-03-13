import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://127.0.0.1:8000/api/quotes/random";

export const fetchQuote = createAsyncThunk("quote/fetchQuote", 
    async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(URL);

        const data = response.data.data;
        console.log(data);
        return data;
    } catch (error) {
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