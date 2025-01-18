import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCoins = createAsyncThunk(
  'coins/fetchCoins',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const coinsSlice = createSlice({
  name: 'coins',
  initialState: {
    data: [],
    filteredData: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    searchCoins: (state, action) => {
      const query = action.payload.toLowerCase();
      state.filteredData = state.data.filter((coin) =>
        coin.name.toLowerCase().includes(query)
      );
    },
    sortCoins: (state, action) => {
      const { key, order } = action.payload;
      state.filteredData = [...state.filteredData].sort((a, b) =>
        order === 'asc' ? a[key] - b[key] : b[key] - a[key]
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.filteredData = action.payload; // Initialize filteredData
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { searchCoins, sortCoins } = coinsSlice.actions;
export const selectFilteredData = (state) => state.coins.filteredData;
export const selectStatus = (state) => state.coins.status;
export const selectError = (state) => state.coins.error;

export default coinsSlice.reducer;
