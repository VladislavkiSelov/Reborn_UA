import React from 'react';
import { useForm } from 'react-hook-form';
import CardUser from 'components/CardUser/CardUser';
import BtnGraphite from 'components/BtnGraphite/BtnGraphite';
import './AddAdvertPage.scss';

export default function AddAdvertPage() {
  const {
    register,
    setValue,
    getValues,
    setError,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

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
          <select
            {...register('category', {
              required: true,
            })}
          >
            <option value="A">A</option>
          </select>
        </label>
        <label
          {...register('city', {
            required: true,
          })}
        >
          <p>Назва міста/селища</p>
          <select>
            <option value="A">A</option>
          </select>
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
        <label>
          <p>Заголовок оголошення</p>
          <input
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
          <div>
            <input type="file" {...register('photo')} />
            <input type="file" {...register('photo')} />
            <input type="file" {...register('photo')} />
            <input type="file" {...register('photo')} />
            <input type="file" {...register('photo')} />
            <input type="file" {...register('photo')} />
          </div>
        </label>
        <div className="box_state_product">
          <h4>Оберіть стан речі:</h4>
          <label>
            Нова
            <input {...register('state_product')} type="radio" value="A" />
          </label>
          <label>
            Б/в
            <input {...register('state_product')} type="radio" value="B" />
          </label>
          <label>
            Пошкоджена
            <input {...register('state_product')} type="radio" value="C" />
          </label>
        </div>
        <div className="box_delivery_method">
          <h4>Вкажіть спосіб відправки:</h4>
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
              {...register('personal_meeting')}
            />
            <span className="by_agreement"></span>
            <p>За домовленістю</p>
          </label>
        </div>
        <BtnGraphite text="Зберегти" />
      </form>
    </section>
  );
}
