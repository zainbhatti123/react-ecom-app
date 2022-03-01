import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        addItem: (state, action) => {
            let index1 = state.findIndex((item) => item.id === action.payload.id);
            if (index1 == -1) {
                state.push(action.payload);
            } else {
                state[index1] = action.payload;
            }
        },

        removeItem: (state, action) => {
            let index2 = state.findIndex((item) => item.id === action.payload.id);
            if (action.payload.init_quantity == 0) {
                state.splice(index2, 1);
            } else {
                state[index2] = action.payload
            }
        },
        removeWholeItem : (state , action) => {
            let index3 = state.findIndex((item) => item.id === action.payload.id);
            state.splice(index3 , 1);
        }
    }
})

export const allProducts = createSlice({
    name: 'allProducts',
    initialState: {
        rec: [],
        filteredArray : []
    },
    reducers: {
        setAllItems: (state, action) => {
            state.rec = action.payload;
        },
        setCartItem: (state, action) => {
            if(action.payload.removeItem){
                let index1 = state.rec.findIndex((item) => item.id === action.payload.product.id);
                state.rec[index1].init_quantity = 0;

                let findItemInFilter = state.filteredArray.findIndex((item) => item.id === action.payload.product.id);
                state.filteredArray[findItemInFilter].init_quantity = 0;
            } else {
                let findItem = state.rec.findIndex((item) => item.id === action.payload.id);
                state.rec[findItem] = action.payload;

                let findItemInFilter = state.filteredArray.findIndex((item) => item.id === action.payload.id);
                state.filteredArray[findItemInFilter] = action.payload;
            }
        },

        getFilteredArray : (state, action) => {
            let array = state.rec.filter((item) => (action.payload.brand ? item.brand === action.payload.brand : true) && (item.fixed_price <= action.payload.max_price && item.fixed_price >= action.payload.min_price));
            state.filteredArray = array;
        }
    }
})

export const { addItem, removeItem , removeWholeItem } = productSlice.actions;
export const { setAllItems, setCartItem, getFilteredArray } = allProducts.actions;
export const cartedProductSlice = productSlice.reducer;
export const allProductsSlice = allProducts.reducer;