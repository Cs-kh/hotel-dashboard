import {configureStore} from '@reduxjs/toolkit';
import hotelSlice from './features/hotelSlice';



const store = configureStore({
    reducer: {
        hotels: hotelSlice
    }
});


export default store;
