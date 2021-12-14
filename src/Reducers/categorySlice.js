import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [
    {
      id: '1',
      storeId: "1",
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-gold-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000',
      name: 'MacBook',
    },
    {
      id: '2',
      storeId: "1",
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/rfb-ipad-pro10in-rosegold-wifi-2017?wid=1144&hei=1144&fmt=jpeg&qlt=80&.v=1582330343120',
      name: 'Ipad',
    },
    {
      id: '3',
      storeId: "1",
      image: 'https://www.zdnet.com/a/img/resize/9d1bc48e039ca9a75b6ba8e39527ada55da32d36/2021/05/24/fc13aa37-b46e-4ee3-9f59-5f4c5f8721d7/apple-imac-24-2021-header.jpg?width=1200&height=900&fit=crop&auto=webp',
      name: 'iMac',
    },
    {
      id: '4',
      storeId: "1",
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73?wid=1144&hei=1144&fmt=jpeg&qlt=80&.v=1632861342000',
      name: 'Airpod',
    },
  ],
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