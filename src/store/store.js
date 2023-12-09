import { configureStore } from '@reduxjs/toolkit';
import sliceUser from './sliceReducer/sliceUser';
import sliceFavoriteProducts from './sliceFavoriteProducts/sliceFavoriteProducts';

export const store = configureStore({
  reducer: { user: sliceUser, favoriteProducts: sliceFavoriteProducts },
});
