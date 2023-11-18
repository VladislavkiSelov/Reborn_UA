import React from 'react';
import { Footer } from './Footer/footer';
import Header from './Header/Header';
import MainPageCategories from './MainPageCategories/MainPageCategories';
import MainPageAboutUs from './MainPageAboutUs/MainPageAboutUs';
import MainPageNewAnnouncements from './MainPageNewAnnouncements/MainPageNewAnnouncements';
import '../css/App.css';

export const App = () => {
  return (
      <div className="container-fluid">
        <Header />
        <MainPageCategories />
        <MainPageAboutUs />
        <MainPageNewAnnouncements />
        <Footer />
      </div>
  );
};
