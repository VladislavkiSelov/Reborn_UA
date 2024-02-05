import React from 'react';
import './DeleteFromArch.scss';
import Button from 'components/Button/Button';

export default function DeleteFromArch({ deleteArchivAds }) {
  return (
    <div className="DeleteFromFav">
      <div className="confirmation">
        <h2 className="confirmation__title">Ваше оголошення видалиться з архіву назавжди і не зможе бути відновлено. Підтвержуєте дію?</h2>
        <div className="confirmation__btns">
          <Button handelClick={deleteArchivAds} classBtn="btn-blue btn-same-width" text="Підтвержую" />
          <Button classBtn="btn-white btn-same-width" text="Скасувати" />
        </div>
      </div>
    </div>
  );
}
