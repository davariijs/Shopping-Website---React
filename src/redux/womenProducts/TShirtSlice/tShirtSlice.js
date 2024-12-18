import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: 'women T-shirt',
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST
  }
};

export const getWomenTShirts = createAsyncThunk(
  "womenTShirtsList/getWomenTShirts", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const WomenTShirtsSlice = createSlice({
  name: "womenTShirtsList",
  initialState: {
    WomenTShirts: {},
    isLoading: 'idle',
    hasError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWomenTShirts.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getWomenTShirts.fulfilled, (state, action) => {
        state.WomenTShirts = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getWomenTShirts.rejected, (state, action) => {
        state.hasError = action.hasError.message;
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectWomenTShirts = state => state.womenTShirtsList.WomenTShirts;
export const selectLoadingState = state => state.womenTShirtsList.isLoading;
export const selectErrorState = state => state.womenTShirtsList.hasError;

export default WomenTShirtsSlice.reducer;