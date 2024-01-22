import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import './FilterProduct.scss';
import axios from 'axios';

export default function FilterProduct({ arrayProducts, setArrayProducts }) {
  const [cityList, setSityList] = useState([]);
  const [filterCity, setFilterCity] = useState([]);
  const [showSityList, setShowSityList] = useState(false);
  const [cities, setCities] = useState('КИЇВ');
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'all' });

  function filterCityMain(array) {
    const city = getValues('city');

    if (city) {
      const resFilter = array.filter(el => el.city === city);
      return resFilter;
    } else {
      return array;
    }
  }

  function filterState(array) {
    const resFilterState = [];
    const newState = getValues('newState');
    const used = getValues('used');
    const damaged = getValues('damaged');

    if (newState) {
      const resFilter = array.filter(el => el.state === 'NEW');
      resFilterState.push(...resFilter);
    }

    if (used) {
      const resFilter = array.filter(el => el.state === 'USED');
      resFilterState.push(...resFilter);
    }

    if (damaged) {
      const resFilter = array.filter(el => el.state === 'DAMAGED');
      resFilterState.push(...resFilter);
    }

    if (resFilterState.length > 0) {
      return resFilterState;
    }
  }

  function filterProduct() {
    const resFilterCity = filterCityMain(arrayProducts);
    const resFilterState = filterState(resFilterCity);
    return resFilterState;
  }
  //filter

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


  const onSubmit = data => {
    const newArrayProducts = filterProduct();
    setArrayProducts(newArrayProducts);
    reset();
  };

  return (
    <aside>
      <div className="filter_wrapper">
        <h3>Фільтри:</h3>
        <form className="form_filter" onSubmit={handleSubmit(onSubmit)}>
          <label className="label_city">
            Місто
            <input onClick={e => showCity(e)} type="text" {...register('city')} />
            {showSityList && (
              <ul className="form_filter__list-city">
                {filterCity.map((el, i) => (
                  <li onClick={e => clickCity(e)} key={i}>
                    {el["Назва об'єкта українською мовою"]}
                  </li>
                ))}
              </ul>
            )}
          </label>
          <h4>Стан</h4>
          <div className="box_input_checkbox_filter">
            <label className="checkbox_label">
              <input type="checkbox" className="input_checkbox" {...register('newState')} />
              <span className="check_box"></span>
              <p>новий в гарному стані</p>
            </label>
            <label className="checkbox_label">
              <input type="checkbox" className="input_checkbox" {...register('used')} />
              <span className="check_box"></span>
              <p>б/у</p>
            </label>
            <label className="checkbox_label">
              <input type="checkbox" className="input_checkbox" {...register('damaged')} />
              <span className="check_box"></span>
              <p>пошкоджений</p>
            </label>
          </div>
          <Button statusDisabled={false} classBtn="btn-blue" text="Показати результати" />
        </form>
      </div>
    </aside>
  );
}
