import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import { ReactComponent as HideSvg } from '../../images/Hide.svg';
import { ReactComponent as ShowSvg } from '../../images/Show.svg';
import './LogIn.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/sliceReducer/sliceUser';

export default function LogIn() {
  const url = `https://back.komirka.pp.ua/api/v1/public/auth`;
  const [showHideElement1, setShowHideElement1] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    setError,
    handleSubmit,
    watch,
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

  useEffect(() => {
    if (isNaN(+watch('login')[0]) === false) {
      const isValidPhone = watch('login').match(
        /^(\+38)?\(0\d{2}\)\d{2}\d{2}\d{3}$/
      );
      if (!isValidPhone) {
        setError('login');
      }
    } else {
      const validationEmail =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = watch('login').match(validationEmail);
      if (!isValidEmail) {
        setError('login');
      }
    }
  }, [watch]);

  const onSubmit = data => {
    axios
      .post(url, {
        email: data.login,
        password: data.password,
      })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response
      })
      .then(response => {
        const url = `https://back.komirka.pp.ua/api/v1/public/users/${response.data.userReference}`;
        axios.get(url).then(res => {
          dispatch(setUser(res.data));
        });
      })
      .catch(error => {
        console.error('Ошибка запроса:', error);
      });
    reset();
  };

  return (
    <>
      <form className="form_log_in" onSubmit={handleSubmit(onSubmit)}>
        <label className={errors.phone && `error_label`}>
          Номер телефону або email
          <input
            type="text"
            className={errors.phone && `error_input`}
            {...register('login', {
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
        <Button text="Увійти" />
      </form>
    </>
  );
}
