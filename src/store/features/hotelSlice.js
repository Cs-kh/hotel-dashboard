import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getHotels = createAsyncThunk("hotels/getHotels", async () => {
  const { data } = await axios.get("http://localhost:3009/api/places");
  return data.hotels;
});

const initialState = {
  hotels: [],
  isLoading: false,
  error: false,
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {},
  extraReducers: {
    [getHotels.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getHotels.fulfilled]: (state, action) => {
      state.hotels = action.payload;
      state.isLoading = false;
    },
    [getHotels.rejected]: (state, action) => {
      state.error = true;
      state.isLoading = false;
    },
  },
});

export default hotelSlice.reducer;
