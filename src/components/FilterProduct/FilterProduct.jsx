import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import './FilterProduct.scss';

export default function FilterProduct({ arrayProducts, setArrayProducts }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  function filterCity(array) {
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
    } else {
      return array;
    }
  }

  function filterProduct() {
    const resFilterCity = filterCity(arrayProducts);
    const resFilterState = filterState(resFilterCity);
    return resFilterState;
  }

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
            <input type="text" {...register('city')} />
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
          <Button text="Показати результати" />
        </form>
      </div>
    </aside>
  );
}
