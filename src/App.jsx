import './scss/reset.scss';
import './scss/fonts.scss';
import './scss/index.scss';
import './scss/App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './page/MainPage/MainPage';
import CategoryPage from 'page/CategoryPage/CategoryPage';
import ProductPage from 'page/ProductPage/ProductPage';
import ErrorPage from 'page/ErrorPage/ErrorPage';
import OwnOfficePage from 'page/OwnOfficePage/OwnOfficePage';

export const App = () => {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/category/:categoryId" element={<CategoryPage />}></Route>
          <Route path="/category/:categoryId/product/:productId" element={<ProductPage />}></Route>
          <Route path="/own-office" element={<OwnOfficePage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
