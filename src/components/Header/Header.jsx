import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from 'components/Search/Search';
import Button from 'components/Button/Button';
import { setUser } from 'store/sliceReducer/sliceUser';
import Authentication from 'components/Authentication/Authentication';
import { setStatusProfile } from 'store/sliceStatusProfile/sliceStatusProfile';
import { useDispatch, useSelector } from 'react-redux';
import './Header.scss';

export default function Header() {
  const dispatch = useDispatch();
  const statusProfile = useSelector(state => state.statusProfile.statusProfile);
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();

  function handelClickProfile() {
    dispatch(setStatusProfile(true));
  }

  function goToAdsPage() {
    navigate('/add-advert');
  }

  function handleLogout() {
    localStorage.removeItem('user');
    dispatch(setUser({}));
  }

  const checkUser = Object.keys(user).length > 0;

  return (
    <>
      <header className="header container">
        <div className="header-logo">
          <Link to="/">
            <img src="/img/logo.svg" alt="logo" />
          </Link>
        </div>
        <Search />
        <Button handelClick={goToAdsPage} text="Додати оголошення" classBtn="btn-green add" />
        <div className="box_btn_header">
          <Link to="/favorite">
            <img src="/img/heart.svg" alt="like" />
          </Link>
          <button onClick={handelClickProfile}>
            <img src="/img/profile.svg" alt="profile" />
          </button>
          {checkUser && (
            <button onClick={handleLogout}>
              <img src="/img/exit_icon.svg" alt="exit" />
            </button>
          )}
        </div>
      </header>
      {statusProfile && <Authentication />}
    </>
  );
}
