import AddAdvertPage from 'page/AddAdvertPage/AddAdvertPage';
import AdsPage from 'page/AdsPage/AdsPage';
import CategoryPage from 'page/CategoryPage/CategoryPage';
import ErrorPage from 'page/ErrorPage/ErrorPage';
import MainPage from 'page/MainPage/MainPage';
import OwnCabinetPage from 'page/OwnOfficePage/OwnCabinetPage';
import PrivacyPolicy from 'page/PrivacyPolicy/PrivacyPolicy';
import ProductPage from 'page/ProductPage/ProductPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

export default function ProtectedRoute() {
  const user = useSelector(state => state.user);

  if (user) {
    return (
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />}></Route>
        <Route path="/category/:categoryId" element={<CategoryPage />}></Route>
        <Route path="/seachProduct/:seachProduct/city/:city" element={<CategoryPage />}></Route>
        <Route path="/category/:categoryId/product/:productId" element={<ProductPage />}></Route>
        <Route path="/favorite" element={<AdsPage />}></Route>
        <Route path="/own-cabinet" element={<OwnCabinetPage />}></Route>
        <Route path="/add-advert" element={<AddAdvertPage />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />}></Route>
        <Route path="/category/:categoryId" element={<CategoryPage />}></Route>
        <Route path="/seachProduct/:seachProduct/city/:city" element={<CategoryPage />}></Route>
        <Route path="/category/:categoryId/product/:productId" element={<ProductPage />}></Route>
        <Route path="/favorite" element={<AdsPage />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    );
  }
}
