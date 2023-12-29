import { createSlice } from '@reduxjs/toolkit';

 const sliceStatusProfile = createSlice({
  name: 'statusProfile',
  initialState: {statusProfile:false},
  reducers: {
    setStatusProfile(state, action) {
      return {
        ...state,
        statusProfile: action.payload,
      };
    },
  },
});

export const {setStatusProfile} = sliceStatusProfile.actions;
export default sliceStatusProfile.reducer
