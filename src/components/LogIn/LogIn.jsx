import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import BtnGraphite from 'components/BtnGraphite/BtnGraphite';
import { ReactComponent as HideSvg } from '../../images/Hide.svg';
import { ReactComponent as ShowSvg } from '../../images/Show.svg';
import './LogIn.scss';
import axios from 'axios';

export default function LogIn() {
  const url = `http://ec2-18-197-60-214.eu-central-1.compute.amazonaws.com/api/v1/public/auth`;
  const [showHideElement1, setShowHideElement1] = useState(false);
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

  const validationPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

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

    axios
    .post(url, {
      email: data.email,
      password: data.password,
    })
    .then(response => {
      console.log('Ответ сервера:', response.data);
    })
    .catch(error => {
      console.error('Ошибка запроса:', error);
    });

    console.log(data);
    reset();
  };

  return (
    <>
      <form className="form_log_in" onSubmit={handleSubmit(onSubmit)}>
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
          {errors.phone && <p className="error_text">*Невірно введено номер</p>}
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
        <label htmlFor="remember_me" className="label_remember_me">
          <input
            type="checkbox"
            className="input_checkbox"
            id="remember_me"
            {...register('remember_me')}
          />
          <span className="check_box"></span>
          <p>Запам’ятати мене</p>
        </label>
        <p>
          <a href="#">Забули пароль?</a>
        </p>
        <BtnGraphite text="Зарєеструватися" />
      </form>
    </>
  );
}
