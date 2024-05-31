import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../interfaces/products";

interface ProductsState {
  value: Product[];
}

const initialState: ProductsState = {
  value: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      let storeValue = state.value
      let index = storeValue.findIndex((storeValue)=> storeValue.id === action.payload.id)
      if(index !== -1){
        storeValue[index].quantity += action.payload.quantity
      }else{
        state.value.push(action.payload);
      }
    },
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
