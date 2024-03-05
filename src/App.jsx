import './scss/reset.scss';
import './scss/fonts.scss';
import './scss/index.scss';
import './scss/App.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import AuthChecker from 'components/AuthChecker/AuthChecker';
import MainPage from 'page/MainPage/MainPage';
import PrivacyPolicy from 'page/PrivacyPolicy/PrivacyPolicy';
import CategoryPage from 'page/CategoryPage/CategoryPage';
import ProductPage from 'page/ProductPage/ProductPage';
import AdsPage from 'page/AdsPage/AdsPage';
import ErrorPage from 'page/ErrorPage/ErrorPage';

export const App = () => {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <AuthChecker />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />}></Route>
          <Route path="/category/:categoryId" element={<CategoryPage />}></Route>
          <Route path="/seachProduct/:seachProduct/city/:city" element={<CategoryPage />}></Route>
          <Route path="/category/:categoryId/product/:productId" element={<ProductPage />}></Route>
          <Route path="/favorite" element={<AdsPage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
          <Route path="/protected/*" element={<ProtectedRoute />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
