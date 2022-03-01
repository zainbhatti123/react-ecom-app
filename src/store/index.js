import { configureStore } from "@reduxjs/toolkit";
import {cartedProductSlice , allProductsSlice} from "../products/product";

export const store = configureStore({
    reducer: {
        products : cartedProductSlice,
        allProducts : allProductsSlice
    },
})