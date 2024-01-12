import { createSlice } from '@reduxjs/toolkit';

 const sliceSeachProducts = createSlice({
  name: 'seachProducts',
  initialState: {seachProducts:[]},
  reducers: {
    setProducts(state, action) {
      return {
        ...state,
        seachProducts: action.payload,
      };
    },
  },
});

export const {setProducts} = sliceSeachProducts.actions;
export default sliceSeachProducts.reducer
