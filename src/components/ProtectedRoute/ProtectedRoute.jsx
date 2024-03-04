import AddAdvertPage from 'page/AddAdvertPage/AddAdvertPage';
import OwnCabinetPage from 'page/OwnOfficePage/OwnCabinetPage';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { setStatusProfile } from 'store/sliceStatusProfile/sliceStatusProfile';

export default function ProtectedRoute() {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  if (Object.keys(user).length === 0) {
    dispatch(setStatusProfile(true));
  } else {
    return (
      <Routes>
        <Route path="/own-cabinet" element={<OwnCabinetPage />} />
        <Route path="/add-advert" element={<AddAdvertPage />} />
      </Routes>
    );
  }
}
