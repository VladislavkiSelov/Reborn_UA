import { createSlice } from '@reduxjs/toolkit';

 const sliceFavoriteProducts = createSlice({
  name: 'favorite products',
  initialState: {favoriteProducts:[]},
  reducers: {
    setFavoriteProducts(state, action) {
      return {
        ...state,
        favoriteProducts: action.payload,
      };
    },
  },
});

export const {setFavoriteProducts} = sliceFavoriteProducts.actions;
export default sliceFavoriteProducts.reducer
