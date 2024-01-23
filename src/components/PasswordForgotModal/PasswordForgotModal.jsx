import React, { useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import './PasswordForgotModal.scss';
import { useForm } from 'react-hook-form';

export default function PasswordForgotModal() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [statusBtn, setStatusBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const validationEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onSubmit = async data => {
    setIsLoading(true);
    const email = getValues('email');
    
    await fetch('https://back.komirka.pp.ua/api/v1/public/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(() => {
        setValue('email', '');
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error sending email:', error);
        setError('email');
      });
  };

  useEffect(() => {
    watch();
    const emailValue = getValues('email');
    const isValidEmail = emailValue.match(validationEmail);

    if (!isValidEmail) {
      setStatusBtn(true);
      return;
    }

    if (Object.keys(errors).length === 0) {
      setStatusBtn(false);
    }
  }, [errors, getValues, validationEmail, watch]);

  return (
    <div className="password-forgot">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label">
          <p className={`${errors.email && 'error'}`}>Email:</p>
          <input
            className={errors?.email && `error_label`}
            type="email"
            {...register('email', {
              required: true,
              pattern: validationEmail,
            })}
          />
          {errors.email && <p className="error_text">*Невірно введено email</p>}
        </label>
        <Button statusDisabled={statusBtn} classBtn="btn-blue" text="Відправити" isLoading={isLoading} />
      </form>
    </div>
  );
}
