import React from 'react';
import Search from 'components/Search/Search';
import MainBtn from 'components/MainBtn/MainBtn';
import './Header.scss';

export default function Header() {
  return (
    <header className="header container">
      <div className="header-logo">
        <img src="/Reborn_UA/img/logo.svg" alt="logo" />
      </div>
      <Search />
      <MainBtn text='Додати оголошення'  className="btn_header"/>
      <div className='box_btn_header'>
      <button><img src="/Reborn_UA/img/heart.svg" alt="like" /></button>
      <button><img src="/Reborn_UA/img/profile.svg" alt="profile" /></button>
      </div>
    </header>
  );
}
