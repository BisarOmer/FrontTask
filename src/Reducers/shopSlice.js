import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shops:[],
}

export const shopSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    addShop: (state,action) => {
      state.shops.push(action.payload)
    },
  },
})

export const { addShop } = shopSlice.actions

export default shopSlice.reducer