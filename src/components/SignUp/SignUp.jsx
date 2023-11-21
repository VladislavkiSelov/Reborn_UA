import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import BtnGraphite from 'components/BtnGraphite/BtnGraphite';
import './SignUp.scss';

export default function SignUp({ setStatusProfile }) {
  const [showHideElement1, setShowHideElement1] = useState(false);
  const [showHideElement2, setShowHideElement2] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validationName = /^[А-ЯA-Z][а-яА-Яa-zA-Z]{1,20}$/;
  const validationPhone = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
  const validationEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validationPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  function closePage() {
    setStatusProfile(false);
  }

  function showPassword(e) {
    const input = e.currentTarget
    if (input.getAttribute('name') === 'password') {
        if (input.getAttribute('type') === 'password') {
            input.setAttribute('type', 'text')
            setShowHideElement1(true)
        } else {
            input.setAttribute('type', 'password')
            setShowHideElement1(false)
        }
    }
    if (input.getAttribute('name') === 'repeat_password') {
        if (input.getAttribute('type') === 'password') {
            input.setAttribute('type', 'text')
            setShowHideElement2(true)
        } else {
            input.setAttribute('type', 'password')
            setShowHideElement2(false)
        }
    }
}


  const onSubmit = data => console.log(data);

  return (
    <>
      <div onClick={closePage} className="wrapper_modal_authentication"></div>
      <div className="sing_up">
        <div className="header_sing_up">
          <button>Увійти</button>
          <button className="active_btn_header_sing_up">Зареєструватися</button>
        </div>
        <form className="form_sing_up" onSubmit={handleSubmit(onSubmit)}>
          <label>
            Ім’я та Прізвище
            <input
              type="text"
              {...register('name', { pattern: validationName })}
            />
          </label>
          <label>
            Номер телефону
            <input
              type="text"
              {...register('phone', { pattern: validationPhone })}
            />
          </label>
          <label>
            E - mail
            <input
              type="text"
              {...register('email', { pattern: validationEmail })}
            />
          </label>
          <label>
            Пароль
            <input
              type="password"
              onClick={(e) => showPassword(e)}
              {...register('password', { pattern: validationPassword })}
            />
            {showHideElement1 && (
              <span className="show">
                <img src="/img/Show.svg" alt="show" />
              </span>
            )}
            {showHideElement1 === false && (
              <span className="show">
                <img src="/img/Hide.svg" alt="hide" />
              </span>
            )}
          </label>
          <label>
            Повторити пароль
            <input
            type="password"
            onClick={(e) => showPassword(e)}
              {...register('repeat_password', { pattern: validationPassword })}
            />
            {showHideElement2 && (
              <span className="show">
                <img src="/img/Show.svg" alt="show" />
              </span>
            )}
            {showHideElement2 === false && (
              <span className="show">
                <img src="/img/Hide.svg" alt="hide" />
              </span>
            )}
          </label>
          <label htmlFor="remember_me" className="label_remember_me">
            <input
              type="checkbox"
              id="remember_me"
              {...register('remember_me', { pattern: true })}
            />
            <span className="check_box"></span>
            <p>Запам’ятати мене</p>
          </label>
          <BtnGraphite text="Зарєеструватися" />
        </form>
        <p>
          Під час входу ви погоджуєтесь з нашими{' '}
          <a href="#">Умовами користування</a>
        </p>
      </div>
    </>
  );
}
