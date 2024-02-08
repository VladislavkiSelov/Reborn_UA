import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CardUser from 'components/CardUser/CardUser';
import Button from 'components/Button/Button';
import { ReactComponent as ArrowDown } from '../../images/arrow_down.svg';
import InputFile from 'components/InputFile/InputFile';
import { setStatusProfile } from 'store/sliceStatusProfile/sliceStatusProfile';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import translationCategory from 'components/TranslationText/TranslationCategory';
import './AddAdvertPage.scss';
import SeachCity from 'components/SeachCity/SeachCity';

export default function AddAdvertPage() {
  const [cityList, setSityList] = useState([]);
  const [showSityList, setShowSityList] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [filterCity, setFilterCity] = useState([]);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user'));
    if (userId === null) {
      dispatch(setStatusProfile(true));
      navigation('/');
    }
  }, [user]);

  const arrayDefaultValuesImg = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
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
  //получение все городов

  const cities = watch('city');

  useEffect(() => {
    setFilterCity(cities ? cityList.filter(city => city["Назва об'єкта українською мовою"].toUpperCase().startsWith(cities.toUpperCase())) : cityList.slice(0, 200));
  }, [cities, cityList]);
  //поиск городо по значению в инпуте

  function clickCity(e) {
    setValue('city', e.target.textContent);
    setShowSityList(false);
    e.preventDefault();
  }

  function clickCategory(e) {
    if (e.target.tagName === 'LI') {
      setValue('category', e.target.textContent);
      setShowCategoryList(false);
      e.preventDefault();
    }
  }

  function showCity(e) {
    if (showSityList === true) {
      return;
    }
    setShowSityList(true);
  }

  function close(e) {
    if (e.target.tagName === 'UL' || e.target.tagName === 'INPUT') {
      return;
    }
    setShowSityList(false);
    setShowCategoryList(false);
  }

  useEffect(() => {
    function clickBody(e) {
      close(e);
    }
    document.querySelector('body').addEventListener('click', clickBody);
    return () => {
      document.querySelector('body').removeEventListener('click', clickBody);
    };
  }, []);
  // Select city and category

  const onSubmit = data => {
    let reference = null;
    const token = JSON.parse(localStorage.getItem('user')).authenticationToken;
    const url = `https://back.komirka.pp.ua/api/v1/private/product/create`;
    const body = {
      categoryName: translationCategory(data.category),
      city: data.city,
      productTitle: data.titel,
      productDescription: data.text_advertisement,
      state: data.state_product,
      publishDate: '2024-02-01',
    };

    const { img1, img2, img3, img4, img5, img6 } = data;
    const arrayImg = [img1, img2, img3, img4, img5, img6];
    const allImg = Object.values(arrayImg).filter(el => el);

    axios
      .post(
        url,
        {},
        {
          headers: {
            accept: `*/*`,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch(error => {
        console.log(`создание продукта`, error);
      })
      .then(res => {
        const URL = `https://back.komirka.pp.ua/api/v1/private/product/${res.data.reference}`;
        reference = res.data.reference;
        return axios.patch(URL, body, {
          headers: {
            accept: `*/*`,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .catch(error => {
        console.log(`изменение продукта`, error);
      })
      .then(res => {
        const urlImg = `https://back.komirka.pp.ua/api/v1/private/product/${res.data.reference}/image`;
        allImg.forEach(item => {
          const formData = new FormData();
          formData.append('image', item);
          axios
            .post(urlImg, formData, {
              headers: {
                accept: `*/*`,
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            })
            .catch(error => {
              console.log(`создание картинки`, error);
            })
            .then(res => {
              const urlImgUpload = `https://back.komirka.pp.ua/api/v1/private/product/image/${res.data.id}`;
              return axios.patch(urlImgUpload, formData, {
                headers: {
                  accept: `*/*`,
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`,
                },
              });
            })
            .catch(error => {
              console.log(`загрузка картинки`, error);
            });
        });
      })
      .then(res => {
        const urlPatchStatusProduct = `https://back.komirka.pp.ua/api/v1/private/product/${reference}/ACTIVE?period=30`;
        return axios.patch(
          urlPatchStatusProduct,
          {},
          {
            headers: {
              accept: `*/*`,
              Authorization: `Bearer ${token}`,
            },
          }
        );
      })
      .catch(error => {
        console.log(`загрузка обьявления`, error);
      });

    reset();
  };

  return (
    <section className="advert-page container">
      <div className="advert-page__wrapper-user">
        <CardUser statusBtn={false} />
      </div>
      <form className="advert-page__form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Додати оголошення</h3>
        <label className="advert-page__form__input-category">
          <p>Оберіть категорію</p>
          <div className="wrapper_select">
            <span className="select_arrow_down">
              <ArrowDown />
            </span>
            <input
              onClick={() => setShowCategoryList(true)}
              {...register('category', {
                required: true,
              })}></input>
            {showCategoryList && (
              <ul onClick={e => clickCategory(e)} className="advert-page__form__list-category">
                <li>Меблі</li>
                <li>Одяг</li>
                <li>Техніка</li>
                <li>Все для дому</li>
                <li>Дитячий світ</li>
                <li>Домашні улюбленці</li>
              </ul>
            )}
          </div>
        </label>
        <SeachCity register={register} setValue={(value1, value2) => setValue(value1, value2)} watch={value => watch(value)} classLabel={`advert-page__form__input-city`} arrow={true}/>
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
          <input type="text" {...register('phone', { required: true })} />
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
            })}></textarea>
        </label>
        <label>
          <p>Додати фото (Перше фото буде на обкладинці оголошення) </p>
          <div className="container_box_input">
            {arrayDefaultValuesImg.map((el, i) => (
              <InputFile key={i} setValue={(value, value2) => setValue(value, value2)} register_name={el} />
            ))}
          </div>
        </label>
        <div className="box_state_product">
          <h4>Оберіть стан речі:</h4>
          <div>
            <label className="wrapper_radio">
              <p>Нова</p>
              <input className="input_radio" {...register('state_product')} type="radio" value="NEW" />
              <span className="radio"></span>
            </label>
            <label className="wrapper_radio">
              <p>Б/в</p>
              <input className="input_radio" {...register('state_product')} type="radio" value="USED" />
              <span className="radio"></span>
            </label>
            <label className="wrapper_radio">
              <p>Пошкоджена</p>
              <input className="input_radio" {...register('state_product')} type="radio" value="DAMAGED" />
              <span className="radio"></span>
            </label>
          </div>
        </div>
        <div className="box_delivery_method">
          <h4>Вкажіть спосіб відправки:</h4>
          <div>
            <label className="wrapper_checkbox">
              <input className="input_checkbox" type="checkbox" {...register('pickup')} />
              <span className="check_box"></span>
              <p>Самовивіз</p>
            </label>
            <label className="wrapper_checkbox">
              <input className="input_checkbox" type="checkbox" {...register('post_office')} />
              <span className="check_box"></span>
              <p>Нова Пошта</p>
            </label>
            <label className="wrapper_checkbox">
              <input className="input_checkbox" type="checkbox" {...register('personal_meeting')} />
              <span className="check_box"></span>
              <p>Особиста зустріч</p>
            </label>
            <label className="wrapper_checkbox">
              <input className="input_checkbox" type="checkbox" {...register('by_appointment')} />
              <span className="check_box"></span>
              <p>За домовленістю</p>
            </label>
          </div>
        </div>
        <Button classBtn="btn-graphite" text="Зберегти" />
      </form>
    </section>
  );
}
