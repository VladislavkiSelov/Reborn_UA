import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import './FilterProduct.scss';
import SearchCity from 'components/SearchCity/SearchCity';

export default function FilterProduct({ arrayProducts, setArrayProducts, originArrayProducts }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'all' });

  function filterCityMain(array) {
    const city = getValues('city');
    if (city) {
      const resFilter = array.filter(el => el.city.toUpperCase() === city.toUpperCase());
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

    return newState || used || damaged ? resFilterState : array;
  }

  function filterProduct() {
    const resFilterCity = filterCityMain(originArrayProducts);
    const resFilterState = filterState(resFilterCity);
    return resFilterState;
  }
  //filter

  const onSubmit = data => {
    if (Object.values(data).some(el => Boolean(el) === true)) {
      const newArrayProducts = filterProduct();
      setArrayProducts(newArrayProducts);
    } else {
      setArrayProducts(originArrayProducts);
      //нужно добавить продукты которые снова нужно скачать с сервера и отобразить
    }
  };

  return (
    <aside>
      <div className="filter_wrapper">
        <h3>Фільтри:</h3>
        <form className="form_filter" onSubmit={handleSubmit(onSubmit)}>
          <SearchCity setValue={(value1, value2) => setValue(value1, value2)} register={register} watch={value => watch(value)} classLabel={`label_city`} arrow={false} />
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
