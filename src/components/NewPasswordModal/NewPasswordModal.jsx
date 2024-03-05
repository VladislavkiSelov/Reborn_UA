import React from 'react';
import { Link } from 'react-router-dom';
import './NewPasswordModal.scss';
import { ReactComponent as CloseSvg } from '../../images/Close.svg';
import Button from 'components/Button/Button';

export default function NewPasswordModal() {

  return (
    <>
        <div className="modal__wrapper"></div>
        <div className="new-password">
          <CloseSvg className="close_btn" />
          <p className="new-password__title">Придумайте новий пароль для користування сайтом:</p>

          <form className="form_new-password" >
            <label >
            Новий пароль
              <input
                type="password"
              />
              <div className="help-wrapper">
                <span>*</span>
                <span className="inline-block">Має містити мінімум 8 символів, латинські букви та цифри</span>
              </div>
            </label>
            <label >
            Повторіть пароль
              <input
                type="password"
              />
            </label>
            <Button classBtn="btn-blue new-password__button" text="Створити" />
          </form>

          <p className="new-password__footer">
            Під час входу ви погоджуєтесь з нашими <Link to="PrivacyPolicy">Умовами користування</Link>
          </p>
        </div>
      </>
  );
}
