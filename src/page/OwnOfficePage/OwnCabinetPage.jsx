import React, { useEffect, useState } from 'react';
import './OwnCabinetPage.scss';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import BtnGraphite from 'components/BtnGraphite/BtnGraphite';
import BtnGreen from 'components/BtnGreen/BtnGreen';
import { ReactComponent as UserProfil } from '../../images/user_cabinet.svg';
import { ReactComponent as UserEmail } from '../../images/mail.svg';
import { ReactComponent as UserPhone } from '../../images/phone.svg';

export default function OwnCabinetPage() {
  const [user, setUser] = useState({});
  const validationName = /^[А-Яа-яЁёA-Za-z]+ [А-Яа-яЁёA-Za-z]+$/;
  const validationEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validationPhone = /^(\+38)?\(0\d{2}\)-\d{2}-\d{2}-\d{3}$/;
  const userId = `9826e6a1-7d37-41cf-b7ed-1df3e2222b42`;
  const url = `http://ec2-18-197-60-214.eu-central-1.compute.amazonaws.com/api/v1/public/users/${userId}`;
  const urlSend = `http://ec2-18-197-60-214.eu-central-1.compute.amazonaws.com/api/v1/private/users/${userId}`;
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  useEffect(() => {
    axios.get(url).then(res => setUser(res.data));
  }, [url]);

  useEffect(() => {
    setValue('name', user.username);
    setValue('phone', user.phoneNumber);
    setValue('email', user.email);
  }, [user]);

  const onSubmit = data => {
    axios
      .get(urlSend, {
        username: data.name,
        email: data.email,
        phoneNumber: data.phone,
      })
      .then(res => console.log(res));
    reset();
  };

  return (
    <div className="own_cabinet container">
      <div>
        <div className="own_cabinet__card">
          <h3>Особисті дані</h3>
          <div>
            <UserProfil />
            <h4>{user.username}</h4>
          </div>
          <div>
            <UserPhone />
            <h4>{user.phoneNumber}</h4>
          </div>
          <div>
            <UserEmail />
            <h4>{user.email}</h4>
          </div>
          <BtnGreen text="Редагувати" />
        </div>
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
        <BtnGraphite text="Зберегти" />
      </form>
    </div>
  );
}
