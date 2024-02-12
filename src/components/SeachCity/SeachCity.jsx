import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ReactComponent as ArrowDown } from '../../images/arrow_down.svg';

export default function SeachCity({ register, setValue, watch, classLabel, arrow, errors }) {
  const [cityList, setSityList] = useState([]);
  const [filterCity, setFilterCity] = useState([]);
  const [showSityList, setShowSityList] = useState(false);
  const [cities, setCities] = useState('КИЇВ');

  function closeListCity(e) {
    if (e.target.tagName === 'UL' || e.target.tagName === 'INPUT') {
      return;
    }
    setShowSityList(false);
  }

  function showCity(e) {
    if (showSityList === true) {
      return;
    }
    setShowSityList(true);
  }

  function clickCity(e) {
    setValue('city', e.target.textContent);
    setShowSityList(false);
    e.preventDefault();
  }

  useEffect(() => {
    setCities(watch('city'));
  });
  //записіваю в стейт значение инпута

  useEffect(() => {
    axios
      .get('/city.json')
      .then(res => {
        setSityList(res.data);
      })
      .catch(error => console.error('Error fetching data:', error));
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
    <label className={`${classLabel} ${errors?.name && `error_label`}`}>
      <p>
      Місто
      </p>
      <div className="wrapper_select">
        <input className={errors?.name && `error_input`} onClick={e => showCity(e)} type="text" {...register('city')} />
        {arrow && (
          <span className="select_arrow_down">
            <ArrowDown />
          </span>
        )}
        {showSityList && (
          <ul className="form_filter__list-city">
            {filterCity.map((el, i) => (
              <li onClick={e => clickCity(e)} key={i}>
                {el["Назва об'єкта українською мовою"]}
              </li>
            ))}
          </ul>
        )}
      </div>
    </label>
  );
}
