import React, { useState } from 'react';
import Search from 'components/Search/Search';
import MainBtn from 'components/BtnGreen/BtnGreen';
import Authentication from 'components/Authentication/Authentication';
import './Header.scss';

export default function Header() {
  const [statusProfile, setStatusProfile] = useState(false);
  function handelClickProfile() {
    setStatusProfile(true);
  }

  return (
    <>
      <header className="header container">
        <div className="header-logo">
          <img src="/img/logo.svg" alt="logo" />
        </div>
        <Search />
        <MainBtn text="Додати оголошення" className="btn_header" />
        <div className="box_btn_header">
          <button>
            <img src="/img/heart.svg" alt="like" />
          </button>
          <button onClick={handelClickProfile}>
            <img src="/img/profile.svg" alt="profile" />
          </button>
        </div>
      </header>
      {statusProfile &&
       <Authentication setStatusProfile={(value)=>setStatusProfile(value)}/>
       }
    </>
  );
}
