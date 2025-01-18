import {configureStore} from '@reduxjs/toolkit';
import coinsReducer from './coinSlice';

export const store = configureStore({
    reducer: {
        coins : coinsReducer,
    },
});