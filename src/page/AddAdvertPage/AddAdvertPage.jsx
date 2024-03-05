import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import CardUser from 'components/CardUser/CardUser';
import Button from 'components/Button/Button';
import { ReactComponent as ArrowDown } from '../../images/arrow_down.svg';
import InputFile from 'components/InputFile/InputFile';
import axios from 'axios';
import translationCategory from 'components/TranslationText/TranslationCategory';
import './AddAdvertPage.scss';
import SeachCity from 'components/SearchCity/SearchCity';
import { IMaskInput } from 'react-imask';
import moment from 'moment';

export default function AddAdvertPage() {
  const [showCategoryList, setShowCategoryList] = useState(false);
  const inputRef = useRef(null);

  const arrayDefaultValuesImg = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    setError,
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
    mode: 'onChange',
  });

  const validationName = /^[А-Яа-яЁё]+ [А-Яа-яЁё]+$/;

  const handleAccept = useMemo(() => () => {
    setValue('phone', inputRef.current.value);
  }, [setValue]);
  
  const handleEmpty = useMemo(() => () => {
    setValue('phone', inputRef.current.value);
  }, [setValue]);

  function checkStateProduct(data) {
    if (!data.state_product) {
      setError('state_product');
    }
  }

  function clickCategory(e) {
    if (e.target.tagName === 'LI') {
      setValue('category', e.target.textContent);
      setShowCategoryList(false);
      e.preventDefault();
    }
  }

  const onSubmit = data => {
    const date = moment(new Date()).format('YYYY-MM-DD');
    checkStateProduct(data);

    let reference = null;
    const token = JSON.parse(localStorage.getItem('user')).authenticationToken;
    const url = `https://back.komirka.pp.ua/api/v1/private/product/create`;

    const body = {
      categoryName: translationCategory(data.category),
      city: data.city,
      productTitle: data.titel,
      productDescription: data.text_advertisement,
      state: data.state_product,
      publishDate: date,
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
    <section>
      <h5 className="nav-advert-page container">
        Головна сторінка/Особистий кабінет<span className="nav-advert-page__nav">/Додавання оголошення</span>
      </h5>
      <div className="advert-page container">
        <div className="advert-page__wrapper-user">
          <CardUser statusBtn={false} />
        </div>
        <form className="advert-page__form" onSubmit={handleSubmit(onSubmit)}>
          <h3>Додати оголошення</h3>
          <label className={`advert-page__form__input-category ${errors.category && `error_label`}`}>
            <p>Оберіть категорію</p>
            <div className="wrapper_select">
              <span className="select_arrow_down">
                <ArrowDown />
              </span>
              <input
                className={errors.category && `error_input`}
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
          <SeachCity
            errors={errors}
            register={register}
            setValue={(value1, value2) => setValue(value1, value2)}
            watch={value => watch(value)}
            classLabel={`advert-page__form__input-city`}
            arrow={true}
          />
          <label className={errors.name && `error_label`}>
            <p>Ім’я та Прізвище</p>
            <input
              className={errors.name && `error_input`}
              type="text"
              {...register('name', {
                required: true,
                pattern: validationName,
              })}
            />
          </label>
          <label className={errors.phone && `error_label`}>
            <p>Номер телефону вказаний у оголошенні</p>
            <IMaskInput
              mask="+{38}(000)-00-00-000"
              radix="."
              unmask={false}
              inputRef={inputRef}
              value={getValues('phone')}
              onAccept={handleAccept}
              onComplete={handleEmpty}
              className={errors.phone && `error_input`}
              type="text"
              {...register('phone', {
                required: true,
              })}
            />
          </label>
          <label className={`titel ${errors.titel && `error_label`}`}>
            <p>Заголовок оголошення</p>
            <input
              className={errors.titel && `error_input`}
              placeholder="Не більше 30 - ти символів"
              {...register('titel', {
                maxLength: 40,
                required: true,
              })}
            />
          </label>
          <label className={errors.text_advertisement && `error_label`}>
            <p>Текст оголошення</p>
            <textarea
              className={errors.text_advertisement && `error_input`}
              {...register('text_advertisement', {
                maxLength: 9000,
                required: true,
              })}></textarea>
          </label>
          <label className="wrapper-input-file">
            <p>Додати фото (Перше фото буде на обкладинці оголошення) </p>
            <p>Доступний формат - JPEG, максимальний розмір фото - 10 Мб </p>
            <div className="container_box_input">
              {arrayDefaultValuesImg.map((el, i) => (
                <InputFile key={i} setValue={(value, value2) => setValue(value, value2)} register_name={el} />
              ))}
            </div>
          </label>
          <div className="box_state_product">
            <h4>Оберіть стан речі:</h4>
            <div>
              <label className={`wrapper_radio`}>
                <p>Нова</p>
                <input className="input_radio" {...register('state_product')} type="radio" value="NEW" />
                <span className="radio"></span>
              </label>
              <label className={`wrapper_radio`}>
                <p>Б/в</p>
                <input className="input_radio" {...register('state_product')} type="radio" value="USED" />
                <span className="radio"></span>
              </label>
              <label className={`wrapper_radio`}>
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
      </div>
    </section>
  );
}
