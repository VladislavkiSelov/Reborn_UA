import { configureStore } from '@reduxjs/toolkit';
import sliceUser from './sliceReducer/sliceUser';

export const store = configureStore({
  reducer: { user: sliceUser },
});
