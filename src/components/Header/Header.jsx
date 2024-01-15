import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from 'components/Search/Search';
import Button from 'components/Button/Button';
import Authentication from 'components/Authentication/Authentication';
import { setStatusProfile } from 'store/sliceStatusProfile/sliceStatusProfile';
import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
  const dispatch = useDispatch();
  const statusProfile = useSelector(state => state.statusProfile.statusProfile);
  const navigate = useNavigate();
  function handelClickProfile() {
    dispatch(setStatusProfile(true));
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
        <Button handelClick={goToPage} text="Додати оголошення" className="btn_header" />
        <div className="box_btn_header">
          <Link to="/favorite">
            <img src="/img/heart.svg" alt="like" />
          </Link>
          <button onClick={handelClickProfile}>
            <img src="/img/profile.svg" alt="profile" />
          </button>
        </div>
      </header>
      {statusProfile && <Authentication/>}
    </>
  );
}
