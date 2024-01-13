import { configureStore } from '@reduxjs/toolkit';
import sliceUser from './sliceReducer/sliceUser';
import sliceFavoriteProducts from './sliceFavoriteProducts/sliceFavoriteProducts';
import sliceStatusProfile from './sliceStatusProfile/sliceStatusProfile';

export const store = configureStore({
  reducer: { user: sliceUser, favoriteProducts: sliceFavoriteProducts, statusProfile: sliceStatusProfile},
});
