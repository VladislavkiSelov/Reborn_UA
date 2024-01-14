import React from 'react';
import { useForm } from 'react-hook-form';
import BtnGreen from 'components/BtnGreen/BtnGreen';
import './FilterProduct.scss';

export default function FilterProduct({ arrayProducts, setArrayProducts }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  function filterProduct() {
    let newArrayProduct = [...arrayProducts];
    const resFilterArrayProducts = [];
    const city = getValues('city');
    const newState = getValues('newState');
    const used = getValues('used');
    const damaged = getValues('damaged');

    if (city) {
      const resFilter = newArrayProduct.filter(el => el.city === city);
      newArrayProduct = resFilter;
    }

    if (newState) {
      const resFilter = newArrayProduct.filter(el => el.state === newState);
      resFilterArrayProducts.push(resFilter);
    }

    if (used) {
      const resFilter = newArrayProduct.filter(el => el.state === used);
      resFilterArrayProducts.push(resFilter);
    }

    if (damaged) {
      const resFilter = newArrayProduct.filter(el => el.state === damaged);
      resFilterArrayProducts.push(resFilter);
    }

    return resFilterArrayProducts;
  }

  const onSubmit = data => {
    setArrayProducts(filterProduct());
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
          <BtnGreen text="Показати результати" />
        </form>
      </div>
    </aside>
  );
}
