import React, { useState } from 'react';
import './DeleteFromArch.scss';
import Button from 'components/Button/Button';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function DeleteFromArch() {
    return (
    <div className="DeleteFromFav">
      <div className="confirmation">
        <h2 className="confirmation__title">Ваше оголошення видалиться з
архіву назавжди і не зможе бути відновлено. Підтвержуєте дію?</h2>
        <div className="confirmation__btns">
          <Button classBtn="btn-blue btn-same-width"  text="Підтвержую" />

          <Button classBtn="btn-white btn-same-width"  text="Скасувати" />
        </div>
      </div>
    </div>
  );
}
