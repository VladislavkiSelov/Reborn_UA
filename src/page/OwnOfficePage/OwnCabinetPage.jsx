import React, { useEffect, useState } from 'react';
import './OwnCabinetPage.scss';
import axios from 'axios';
import CardUser from 'components/CardUser/CardUser';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';

export default function OwnCabinetPage() {
  const user = useSelector(state => state.user.user);

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
        <CardUser statusBtn={true} />
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
        <Button classBtn="btn-graphite" statusDisabled={false} text="Зберегти" />
      </form>
    </div>
  );
}
