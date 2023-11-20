import React from 'react';
import MainPageCategories from 'components/MainPageCategories/MainPageCategories';
import MainPageAboutUs from 'components/MainPageAboutUs/MainPageAboutUs';
import MainPageNewAnnouncements from 'components/MainPageNewAnnouncements/MainPageNewAnnouncements';
import './MainPage.scss';

export default function MainPage() {
  return (
    <section className='main_page container'>
      <MainPageCategories />
      <MainPageAboutUs />
      <MainPageNewAnnouncements />
    </section>
  );
}
