import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shops: [],
}

export const shopSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    addShop: (state, action) => {
      state.shops.push(action.payload)
    },
    deleteShop: (state, action) => {
      state.shops = state.shops.filter(shop => shop.id !== action.payload)
    },
  },
})

export const { addShop, deleteShop } = shopSlice.actions

export default shopSlice.reducer