import { configureStore } from '@reduxjs/toolkit';
import sliceUser from './sliceReducer/sliceUser';
import sliceFavoriteProducts from './sliceFavoriteProducts/sliceFavoriteProducts';
import sliceSeachProducts from './sliceSeachProducts/sliceSeachProducts';
import sliceStatusProfile from './sliceStatusProfile/sliceStatusProfile';

export const store = configureStore({
  reducer: { user: sliceUser, favoriteProducts: sliceFavoriteProducts, statusProfile: sliceStatusProfile,seachProducts:sliceSeachProducts },
});
