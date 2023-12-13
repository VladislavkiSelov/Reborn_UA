import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CardUser from 'components/CardUser/CardUser';
import BtnGraphite from 'components/BtnGraphite/BtnGraphite';
import { ReactComponent as ArrowDown } from '../../images/arrow_down.svg';
import InputFile from 'components/InputFile/InputFile';
import './AddAdvertPage.scss';
import axios from 'axios';

export default function AddAdvertPage() {
  const [cityList, setSityList] = useState([]);
  const [filterCity, setFilterCity] = useState([]);

  const arrayDefaultValuesImg = [
    'img1',
    'img2',
    'img3',
    'img4',
    'img5',
    'img6',
  ];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      img1: '',
      img2: '',
      img3: '',
      img4: '',
      img5: '',
      img6: '',
    },
    mode: 'onSubmit',
  });

  useEffect(() => {
    axios
      .get('/city.json')
      .then(res => {
        setSityList(res.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const cities = watch('city');

  useEffect(() => {
    setFilterCity(
      cities
        ? cityList.filter(city =>
            city["Назва об'єкта українською мовою"]
              .toUpperCase()
              .startsWith(cities.toUpperCase())
          )
        : cityList.slice(0, 40)
    );
  }, [cities, cityList]);

  function clickCity(e) {
    console.log(e.target);
    setValue('city', e.target.textContent);
  }

  const onSubmit = data => {
    console.log(data);
    reset();
  };

  return (
    <section className="advert-page container">
      <div className="advert-page__wrapper-user">
        <CardUser />
      </div>
      <form className="advert-page__form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Додати оголошення</h3>
        <label>
          <p>Оберіть категорію</p>
          <div className="wrapper_select">
            <span className="select_arrow_down">
              <ArrowDown />
            </span>
            <select
              {...register('category', {
                required: true,
              })}
            >
              <option value="Меблі">Меблі</option>
              <option value="Одяг">Одяг</option>
              <option value="Техніка">Техніка</option>
              <option value="Все для  дому">Все для дому</option>
              <option value="Дитячий світ">Дитячий світ</option>
              <option value="Домашні улюбленці">Домашні улюбленці</option>
            </select>
          </div>
        </label>
        <label>
          <p>Назва міста/селища</p>
          <input
            type="seach"
            {...register('city', {
              required: true,
            })}
          />
          <ul>
            {filterCity.map((el, i) => (
              <li onClick={e => clickCity(e)}>
                {el["Назва об'єкта українською мовою"]}
              </li>
            ))}
          </ul>
        </label>
        <label>
          <p>Ім’я та Прізвище</p>
          <input
            type="text"
            {...register('name', {
              required: true,
            })}
          />
        </label>
        <label>
          <p>Номер телефону вказаний у оголошенні</p>
          <input
            type="text"
            {...register('phone', {
              required: true,
            })}
          />
        </label>
        <label className="titel">
          <p>Заголовок оголошення</p>
          <input
            placeholder="Не більше 30 - ти символів"
            {...register('titel', {
              required: true,
            })}
          />
        </label>
        <label>
          <p>Текст оголошення</p>
          <textarea
            {...register('text_advertisement', {
              required: true,
            })}
          ></textarea>
        </label>
        <label>
          <p>Додати фото (Перше фото буде на обкладинці оголошення) </p>
          <div className="container_box_input">
            {arrayDefaultValuesImg.map((el, i) => (
              <InputFile
                key={i}
                register={register}
                register_name={el}
                Controller={Controller}
                control={control}
              />
            ))}
          </div>
        </label>
        <div className="box_state_product">
          <h4>Оберіть стан речі:</h4>
          <div>
            <label className="wrapper_radio">
              <p>Нова</p>
              <input
                className="input_radio"
                {...register('state_product')}
                type="radio"
                value="A"
              />
              <span className="radio"></span>
            </label>
            <label className="wrapper_radio">
              <p>Б/в</p>
              <input
                className="input_radio"
                {...register('state_product')}
                type="radio"
                value="B"
              />
              <span className="radio"></span>
            </label>
            <label className="wrapper_radio">
              <p>Пошкоджена</p>
              <input
                className="input_radio"
                {...register('state_product')}
                type="radio"
                value="C"
              />
              <span className="radio"></span>
            </label>
          </div>
        </div>
        <div className="box_delivery_method">
          <h4>Вкажіть спосіб відправки:</h4>
          <div>
            <label className="wrapper_checkbox">
              <input
                className="input_checkbox"
                type="checkbox"
                {...register('pickup')}
              />
              <span className="check_box"></span>
              <p>Самовивіз</p>
            </label>
            <label className="wrapper_checkbox">
              <input
                className="input_checkbox"
                type="checkbox"
                {...register('post_office')}
              />
              <span className="check_box"></span>
              <p>Нова Пошта</p>
            </label>
            <label className="wrapper_checkbox">
              <input
                className="input_checkbox"
                type="checkbox"
                {...register('personal_meeting')}
              />
              <span className="check_box"></span>
              <p>Особиста зустріч</p>
            </label>
            <label className="wrapper_checkbox">
              <input
                className="input_checkbox"
                type="checkbox"
                {...register('by_appointment')}
              />
              <span className="check_box"></span>
              <p>За домовленістю</p>
            </label>
          </div>
        </div>
        <BtnGraphite text="Зберегти" />
      </form>
    </section>
  );
}
