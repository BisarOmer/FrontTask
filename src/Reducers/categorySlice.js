import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [],
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload)
    },
  },
})


export const { addCategory } = categorySlice.actions

export default categorySlice.reducer