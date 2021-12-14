import { configureStore } from '@reduxjs/toolkit'


import shopReducer from '../Reducers/shopSlice'
import categoryReducer from '../Reducers/categorySlice'
import productReducer from '../Reducers/productSlice'

export const store = configureStore({
    reducer: {
        shops: shopReducer,
        categories: categoryReducer,
        products: productReducer
    },
})