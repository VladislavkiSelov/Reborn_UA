import { createSlice } from '@reduxjs/toolkit';

 const sliceUser = createSlice({
  name: 'user',
  initialState: {user:{}},
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});

export const {setUser} = sliceUser.actions;
export default sliceUser.reducer
