import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shops: [
    {
      id: "1",
      logo: "https://yt3.ggpht.com/ytc/AKedOLQR6CdQxBvU0Ye8hUpCyMc6HMwoMivl_vad_YmjZg=s900-c-k-c0x00ffffff-no-rj",
      name: "Apple",
      address: "USA",
      phone: "528-02-456",
      status: true
    },
    {
      id: "2",
      logo: "https://yt3.ggpht.com/ytc/AKedOLTxAANt4In2gv9PzQX8lLEXPOe92v9w2wjIfKCqTQ=s900-c-k-c0x00ffffff-no-rj",
      name: "Microsoft",
      address: "USA",
      phone: "529-02-4126",
      status: true
    },
    {
      id: "3",
      logo: "https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg",
      name: "Nike",
      address: "USA",
      phone: "528-47-854",
      status: true
    },
    {
      id: "4",
      logo: "https://logowik.com/content/uploads/images/adidas-old8715.jpg",
      name: "Adidas",
      address: "USA",
      phone: "528-88-456",
      status: true
    },
    {
      id: "5",
      logo: "https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1",
      name: "Google",
      address: "USA",
      phone: "528-02-456",
      status: true
    },
    {
      id: "6",
      logo: "https://logowik.com/content/uploads/images/xiaomi-2021-new4988.jpg",
      name: "xiaomi",
      address: "China",
      phone: "125-02-456",
      status: true
    },
    {
      id: "7",
      logo: "https://www.oneplus.com/content/dam/oasis/page/common/logo/OnePlus_Logo.png",
      name: "OnePlus",
      address: "China",
      phone: "528-02-456",
      status: true
    },
    {
      id: "8",
      logo: "https://logowik.com/content/uploads/images/424_asus.jpg",
      name: "Asus",
      address: "Taiwan",
      phone: "528-02-456",
      status: true
    }
  ],
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