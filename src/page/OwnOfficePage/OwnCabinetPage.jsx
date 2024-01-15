import React, { useEffect, useState } from 'react';
import './OwnCabinetPage.scss';
import axios from 'axios';
import CardUser from 'components/CardUser/CardUser';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setStatusProfile } from 'store/sliceStatusProfile/sliceStatusProfile';
import Button from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function OwnCabinetPage() {
  const user = useSelector(state => state.user.user);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const validationName = /^[А-Яа-яЁёA-Za-z]{2,20} [А-Яа-яЁёA-Za-z]{2,20}$/;
  const validationEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validationPhone = /^(\+38)?\(0\d{2}\)-\d{2}-\d{2}-\d{3}$/;

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  if (Object.keys(user).length === 0) {
    dispatch(setStatusProfile(true));
    navigation('/');
  }

  useEffect(() => {
    setValue('name', user.username);
    setValue('phone', user.phoneNumber);
    setValue('email', user.email);
  }, [user]);

  const onSubmit = data => {
    const userId = JSON.parse(localStorage.getItem('user'));
    const urlSend = `https://back.komirka.pp.ua/api/v1/private/users/${userId.userReference}`;

    axios
      .patch(
        urlSend,
        {
          username: data.name,
          email: data.email,
          phoneNumber: data.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${userId.authenticationToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(res => console.log(res));
    reset();
  };

  return (
    <div className="own_cabinet container">
      <div>
        <CardUser />
      </div>
      <form className="own_cabinet__form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Ім’я та прізвище
          <input
            type="text"
            {...register('name', {
              required: true,
              pattern: validationName,
            })}
          />
        </label>
        <label>
          Номер телефону
          <input
            type="text"
            {...register('phone', {
              required: true,
              pattern: validationPhone,
            })}
          />
        </label>
        <label>
          E - mail
          <input
            type="text"
            {...register('email', {
              required: true,
              pattern: validationEmail,
            })}
          />
        </label>
        <Button text="Зберегти" />
      </form>
    </div>
  );
}
