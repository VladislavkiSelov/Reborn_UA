import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import { ReactComponent as HideSvg } from '../../images/Hide.svg';
import { ReactComponent as ShowSvg } from '../../images/Show.svg';
import './LogIn.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/sliceReducer/sliceUser';

export default function LogIn({ setStatusAuthentication, closePage }) {
  const urlEmail = `https://back.komirka.pp.ua/api/v1/public/auth`;
  const urlPhone = `https://back.komirka.pp.ua/api/v1/public/auth/phone`;
  const [url, setUrl] = useState('');
  const [showHideElement1, setShowHideElement1] = useState(false);
  const [loginPattern, setLoginPattern] = useState(null);
  const [statusBtn, setStatusBtn] = useState(true);
  const [statusLogin, setStatusLogin] = useState(true);
  let loginRef = useRef('');

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const validationPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const editFormatLogin = useCallback(
    phoneNumber => {
      if (phoneNumber.length === 1) {
        const login = '+38(' + phoneNumber.substring(0, 3);
        setValue('login', login);
        return;
      }
      if (phoneNumber.length === 7) {
        const login = '+38(' + phoneNumber.substring(4, 7) + ')-';
        setValue('login', login);
        return;
      }
      if (phoneNumber.length === 11) {
        const login = '+38(' + phoneNumber.substring(4, 7) + ')-' + phoneNumber.substring(9, 11) + '-';
        setValue('login', login);
        return;
      }
      if (phoneNumber.length === 14) {
        const login = '+38(' + phoneNumber.substring(4, 7) + ')-' + phoneNumber.substring(9, 11) + '-' + phoneNumber.substring(12, 14) + '-';
        setValue('login', login);
        return;
      }
      if (phoneNumber.length > 18) {
        const login =
          '+38(' + phoneNumber.substring(4, 7) + ')-' + phoneNumber.substring(9, 11) + '-' + phoneNumber.substring(12, 14) + '-' + phoneNumber.substring(15, 18);
        setValue('login', login);
      }
    },
    [setValue]
  );

  useEffect(() => {
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const loginValue = watch('login');

    if (isEmail.test(loginValue)) {
      setUrl(urlEmail);
      setLoginPattern(isEmail);
      setStatusLogin(false);
    }

    if (/^\d/.test(loginValue[0]) || loginValue[0] === '+') {
      setUrl(urlPhone);
      setLoginPattern(/^(\+38\(\d{3}\)-\d{2}-\d{2}-\d{3})$/);
      setStatusLogin(true);
      if (loginValue.length > loginRef.current.length) {
        editFormatLogin(loginValue);
      }
    }

    loginRef.current = loginValue;
  }, [watch('login'), editFormatLogin]);

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

  const addDisabled = () => {
    const login = getValues('login');
    const password = getValues('password');

    if (Object.keys(errors).length > 0 || login.length === 0 || password.length === 0) {
      setStatusBtn(true);
      return;
    } else {
      setStatusBtn(false);
    }
  };

  useEffect(() => {
    addDisabled();
  });
  // добавление Disabled кнопке

  const onSubmit = data => {
    const body = statusLogin ? { phone: data.login, password: data.password } : { email: data.login, password: data.password };
    axios
      .post(url, body)
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
        setError('login');
        setError('password');
        console.error('Ошибка запроса:', error);
      })
      .finally(() => {
        closePage();
        reset();
      });
  };

  return (
    <>
      <form className="form_log_in" onSubmit={handleSubmit(onSubmit)}>
        <label className={errors?.login && `error_label`}>
          Номер телефону або email
          <input
            type="text"
            ref={loginRef}
            className={errors.login && `error_input`}
            {...register('login', {
              required: true,
              pattern: loginPattern,
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
          {errors.password && <p className="error_text">*Невірно введено пароль</p>}
        </label>
        <label htmlFor="remember_me" className="label_remember_me">
          <input type="checkbox" className="input_checkbox" id="remember_me" {...register('remember_me')} />
          <span className="check_box"></span>
          <p>Запам’ятати мене</p>
        </label>
        <p>
          <p href="#" onClick={() => setStatusAuthentication('ForgotPassword')}>
            Забули пароль?
          </p>
        </p>
        <Button statusDisabled={statusBtn} classBtn="btn-blue" text="Увійти" />
      </form>
    </>
  );
}
