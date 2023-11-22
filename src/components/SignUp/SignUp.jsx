import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import BtnGraphite from 'components/BtnGraphite/BtnGraphite';
import { ReactComponent as HideSvg } from '../../images/Hide.svg';
import { ReactComponent as ShowSvg } from '../../images/Show.svg';
import { ReactComponent as CloseSvg } from '../../images/Close.svg';
import './SignUp.scss';

export default function SignUp({ setStatusProfile }) {
  const [showHideElement1, setShowHideElement1] = useState(false);
  const [showHideElement2, setShowHideElement2] = useState(false);
  const inputRef = useRef(null);
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

  const validationName = /^[А-ЯA-Z][а-яА-Яa-zA-Z]{1,20}$/;
  const validationEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validationPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  function closePage() {
    setStatusProfile(false);
  }

  function showPassword(e) {
    const input = e.currentTarget;
    if (input.getAttribute('name') === 'password') {
      if (input.getAttribute('type') === 'password') {
        input.setAttribute('type', 'text');
        setShowHideElement1(true);
      } else {
        input.setAttribute('type', 'password');
        setShowHideElement1(false);
      }
    }
    if (input.getAttribute('name') === 'repeat_password') {
      if (input.getAttribute('type') === 'password') {
        input.setAttribute('type', 'text');
        setShowHideElement2(true);
      } else {
        input.setAttribute('type', 'password');
        setShowHideElement2(false);
      }
    }
  }

  const handleAccept = () => {
    setValue('phone', inputRef.current.value);
  };

  const handleEmpty = () => {
    setValue('phone', inputRef.current.value);
  };

  const onSubmit = data => {
    const isValidPhone = inputRef.current.value.match(
      /^(\+38)?\(0\d{2}\)-\d{2}-\d{2}-\d{3}$/
    );

    if (!isValidPhone) {
      setError('phone', { type: 'pattern', message: '*Невірно введено номер' });
      return;
    } else {
      clearErrors('phone');
    }

    console.log(data);
    reset();
  };

  return (
    <>
      <div onClick={closePage} className="wrapper_modal_authentication"></div>
      <div className="sing_up">
        <CloseSvg onClick={closePage} className="close_btn" />
        <div className="header_sing_up">
          <button>Увійти</button>
          <button className="active_btn_header_sing_up">Зареєструватися</button>
        </div>
        <form className="form_sing_up" onSubmit={handleSubmit(onSubmit)}>
          <label className={errors.name && `error_label`}>
            Ім’я та Прізвище
            <input
              type="text"
              className={errors.name && `error_input`}
              {...register('name', { required: true, pattern: validationName })}
            />
            {errors.name && (
              <p className="error_text">*Ім'я може містити тільки букви</p>
            )}
          </label>
          <label className={errors.phone && `error_label`}>
            Номер телефону
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
            {errors.phone && (
              <p className="error_text">*Невірно введено номер</p>
            )}
          </label>
          <label className={errors.email && `error_label`}>
            E - mail
            <input
              type="text"
              className={errors.email && `error_input`}
              {...register('email', {
                required: true,
                pattern: validationEmail,
              })}
            />
            {errors.email && (
              <p className="error_text">*Невірно введено E-mail</p>
            )}
          </label>
          <label className={errors.password && `error_label`}>
            Пароль
            <input
              className={errors.password && `error_input`}
              type="password"
              onClick={e => showPassword(e)}
              {...register('password', {
                required: true,
                pattern: validationPassword,
              })}
            />
            {showHideElement1 && (
              <span className="show">
                <ShowSvg className={errors?.password && `error_svg`} />
              </span>
            )}
            {showHideElement1 === false && (
              <span className="show">
                <HideSvg className={errors?.password && `error_svg`} />
              </span>
            )}
            {errors.password && (
              <p className="error_text">*Пароль має містити від 8 символів</p>
            )}
          </label>
          <label className={errors.repeat_password && `error_label`}>
            Повторити пароль
            <input
              className={errors.repeat_password && `error_input`}
              type="password"
              onClick={e => showPassword(e)}
              {...register('repeat_password', {
                required: true,
                pattern: validationPassword,
              })}
            />
            {showHideElement2 && (
              <span className="show">
                <ShowSvg className={errors?.repeat_password && `error_svg`} />
              </span>
            )}
            {showHideElement2 === false && (
              <span className="show">
                <HideSvg className={errors?.repeat_password && `error_svg`} />
              </span>
            )}
            {errors.repeat_password && (
              <p className="error_text">*Паролі не співпадають</p>
            )}
          </label>
          <label htmlFor="remember_me" className="label_remember_me">
            <input
              type="checkbox"
              id="remember_me"
              {...register('remember_me')}
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
