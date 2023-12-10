import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from 'components/Search/Search';
import MainBtn from 'components/BtnGreen/BtnGreen';
import Authentication from 'components/Authentication/Authentication';
import './Header.scss';

export default function Header() {
  const [statusProfile, setStatusProfile] = useState(false);
  const navigate = useNavigate();
  function handelClickProfile() {
    setStatusProfile(true);
  }

  function goToPage() {
    navigate('/add-advert');
  }

  return (
    <>
      <header className="header container">
        <div className="header-logo">
          <Link to="/">
            <img src="/img/logo.svg" alt="logo" />
          </Link>
        </div>
        <Search />
        <MainBtn
          handelClick={goToPage}
          text="Додати оголошення"
          className="btn_header"
        />
        <div className="box_btn_header">
          <Link to="/favorite">
            <img src="/img/heart.svg" alt="like" />
          </Link>
          <button onClick={handelClickProfile}>
            <img src="/img/profile.svg" alt="profile" />
          </button>
        </div>
      </header>
      {statusProfile && (
        <Authentication setStatusProfile={value => setStatusProfile(value)} />
      )}
    </>
  );
}
