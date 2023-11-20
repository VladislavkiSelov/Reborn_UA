import './scss/reset.scss';
import './scss/fonts.scss';
import './scss/index.scss';
import './scss/App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './page/MainPage/MainPage';

export const App = () => {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/Reborn_UA" element={<MainPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
