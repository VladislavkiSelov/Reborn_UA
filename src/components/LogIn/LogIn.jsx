import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import { ReactComponent as HideSvg } from '../../images/Hide.svg';
import { ReactComponent as ShowSvg } from '../../images/Show.svg';
import PasswordForgotModal from 'components/PasswordForgotModal/PasswordForgotModal';
import './LogIn.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/sliceReducer/sliceUser';

export default function LogIn({ setStatusAuthentication }) {
  const url = `https://back.komirka.pp.ua/api/v1/public/auth`;
  const [showHideElement1, setShowHideElement1] = useState(false);
  const [statusBtn, setStatusBtn] = useState(true);
  const [showPasswordForgotModal, setShowPasswordForgotModal] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    setError,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const validationPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const validationEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

  // useEffect(() => {
  //   if (isNaN(+watch('login')[0]) === false) {
  //     const isValidPhone = watch('login').match(/^(\+38)?\(0\d{2}\)\d{2}\d{2}\d{3}$/);
  //     if (!isValidPhone) {
  //       setError('login');
  //     }
  //   } else {
  //     // const validationEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //     const isValidEmail = watch('login').match(validationEmail);
  //     if (!isValidEmail) {
  //       setError('login');
  //     }
  //   }
  // }, [watch,setError]);

  useEffect(() => {
    const login = getValues('login');
    const password = getValues('password');

    if (errors.login || errors.password) {
      setStatusBtn(true);
      return;
    }

    if (login.length === 0 || password.length === 0) {
      setStatusBtn(true);
      return;
    }

    if (Object.keys(errors).length === 0) {
      setStatusBtn(false);
    }
  }, [errors.login, errors.password, getValues('login'), getValues('password')]);
  // добавление Disabled кнопке

  const handleForgotPasswordClick = () => {
    setStatusAuthentication('ForgotPassword');
  };

  const onSubmit = data => {
    axios
      .post(url, {
        email: data.login,
        password: data.password,
      })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response;
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
      {showPasswordForgotModal ? (
        <PasswordForgotModal onClose={() => setShowPasswordForgotModal(false)} />
      ) : (
        <form className="form_log_in" onSubmit={handleSubmit(onSubmit)}>
          <label className={errors?.login && `error_label`}>
            Номер телефону або email
            <input
              type="text"
              className={errors.login && `error_input`}
              {...register('login', {
                required: true,
                pattern: validationEmail,
              })}
            />
            {errors.login && <p className="error_text">*Невірно введено логін</p>}
          </label>
          <label className={errors?.password && `error_label`}>
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
            {errors.password && <p className="error_text">*Пароль має містити від 8 символів</p>}
          </label>
          <label htmlFor="remember_me" className="label_remember_me">
            <input type="checkbox" className="input_checkbox" id="remember_me" {...register('remember_me')} />
            <span className="check_box"></span>
            <p>Запам’ятати мене</p>
          </label>
          <p>
            <p href="#" onClick={handleForgotPasswordClick}>
              Забули пароль?
            </p>
          </p>
          <Button statusDisabled={statusBtn} classBtn="btn-blue" text="Увійти" />
        </form>
      )}
    </>
  );
}
