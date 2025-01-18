import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchCoins = createAsyncThunk('coin/fetchCoins', async()=>{
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    return response.data;
});

const coinSlice =  createSlice({
    name: 'coins',
    initialState: {
        data : [],
        status: 'idle',
    },

    reducers:{
        searchCoins : (state, action)=>{
            const query = action.payload.toLowerCase();
            state.filteredData = state.data.filter((coin)=>
            coin.name.toLowerCase().includes(query)
        );
        },
        sortCoins : (state, action)=>{
            const {key, order} = action.payload;
            state.filteredData.sort((a,b)=>
            order === 'asc' ? a[key] - b[key] : b[key] - a[key]
        );
        },
    },

    extraReducers: (builder)=>{
        builder
        .addCase(fetchCoins.pending,(state) =>{
            state.status = 'failed';
        });
    },
});

export const {searchCoins, sortCoins} = coinSlice.actions;
export default coinSlice.reducer;