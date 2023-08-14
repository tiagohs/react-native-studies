import { configureStore } from '@reduxjs/toolkit'
import basketReducer from '../features/basketSlices'
import restaurantReducer from '../features/restaurantSlices'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer
  },
})