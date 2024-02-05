import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Search.scss';

function Search() {
  const [cityList, setSityList] = useState([]);
  const [product, setProduct] = useState('');
  const [filterCity, setFilterCity] = useState([]);
  const [showSityList, setShowSityList] = useState(false);
  const [cities, setCities] = useState('КИЇВ');
  const navigation = useNavigate();

  function changeCity(e) {
    setCities(e.target.value);
  }

  function showCity(e) {
    if (showSityList === true) {
      return;
    }
    setShowSityList(true);
  }

  function clickCity(e) {
    setCities(e.target.textContent);
    setShowSityList(false);
    e.preventDefault();
  }

  function closeListCity(e) {
    if (e.target.tagName === 'UL' || e.target.tagName === 'INPUT') {
      return;
    }
    setShowSityList(false);
  }

  function seachProduct(e) {
    setProduct(e.target.value);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      navigation(`/seachProduct/${product}/city/${cities}`);
    }
  }

  useEffect(() => {
    axios
      .get('/city.json')
      .then(res => {
        setSityList(res.data);
      })
      .catch(error => console.error('Error fetching data:', error));
    setProduct('');
  }, []);
  //загружаю все города

  useEffect(() => {
    setFilterCity(cities ? cityList.filter(city => city["Назва об'єкта українською мовою"].toUpperCase().startsWith(cities.toUpperCase())) : cityList.slice(0, 200));
  }, [cities, cityList]);
  //фильтрную города по значению инпута

  useEffect(() => {
    function clickBody(e) {
      closeListCity(e);
    }
    document.querySelector('body').addEventListener('click', clickBody);
    return () => {
      document.querySelector('body').removeEventListener('click', clickBody);
    };
  }, []);
  //закрываю список городов

  return (
    <div className="searchContainer">
      <label>
        <img src="/img/search.svg" alt="#" />
        <input className="searchField" type="text" onKeyDown={handleKeyPress} onChange={e => seachProduct(e)} value={product} placeholder="шукати" />
      </label>
      <label>
        <img src="/img/location.svg" alt="#" />
        <input className="searchSiti" type="text" onClick={e => showCity(e)} onChange={e => changeCity(e)} placeholder="локація" value={cities} />
        {showSityList && (
          <ul className="advert-page__form__list-city">
            {filterCity.map((el, i) => (
              <li onClick={e => clickCity(e)} key={i}>
                {el["Назва об'єкта українською мовою"]}
              </li>
            ))}
          </ul>
        )}
      </label>
    </div>
  );
}

export default Search;
