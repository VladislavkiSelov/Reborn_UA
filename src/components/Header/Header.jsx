import React from 'react'
import Search from 'components/Search/Search'
import ProfileButton from '../ProfileButton/ProfileButton';

export default function Header() {
  return (
    <header className="header">
    <div className="container-fluid">
      <div className="header-line">
        <div className="header-logo">
          <img src=" " alt="logo" />
        </div>

        <div className="searchContainer">
          <Search />
          <div className="selectCity">
            <label htmlFor="cities" className="customSelect">
              <select className="cities" id="cities">
                <option value="odessa">Одесса</option>
                <option value="kharkiv">Харків</option>
                <option value="kyiv">Київ</option>
                <option value="kherson">Херсон</option>
                <option value="lviv">Львів</option>
                <option value="ternopil">Тернопіль</option>
                <option value="sevastopol">Севастополь</option>
              </select>
            </label>
          </div>
        </div>

        <div className="Advertisment">
          <a className="addAdvertisment" href=" ">
            Додати оголошення
          </a>
        </div>
        <ProfileButton />
      </div>
    </div>
  </header>
  )
}
