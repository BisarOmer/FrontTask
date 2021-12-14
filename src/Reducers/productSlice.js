import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [
    {
      id: '1',
      categoryId: "1",
      image: 'https://www.apple.com/v/macbook-pro-14-and-16/b/images/overview/hero/hero_intro_endframe__e6khcva4hkeq_large.jpg',
      name: 'Macbook pro 2021',
      price: "21000"
    },
    {
      id: '2',
      categoryId: "1",
      image: 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP809/sp809mbp16touch-space-2019.jpeg',
      name: 'Macbook pro 2019',
      price: "1800"
    },
    {
      id: '3',
      categoryId: "1",
      image: 'https://www.apple.com/v/macbook-pro-13/j/images/overview/hero_endframe__bsza6x4fldiq_large_2x.jpg',
      name: 'Macbook pro 2020 M1',
      price: "1500"
    },
    {
      id: '4',
      categoryId: "1",
      image: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fbrookecrothers%2Ffiles%2F2018%2F07%2Fmacbook-pro-15-side-2018-edit-1200x620.jpg',
      name: 'Macbook pro 2018',
      price: "1200"
    },

  ],
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
  },
})

export const { addProduct } = productSlice.actions

export default productSlice.reducer