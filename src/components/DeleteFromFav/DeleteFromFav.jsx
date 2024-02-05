import React from 'react';
import './DeleteFromFav.scss';
import Button from 'components/Button/Button';

export default function DeleteFromFav({ deleteFavoriteAds, closeModal }) {
  return (
    <div className="DeleteFromFav">
      <div className="confirmation">
        <h2 className="confirmation__title">Оголошення буде видалено з улюбленого</h2>
        <div className="confirmation__btns">
          <Button classBtn="btn-blue btn-same-width" handelClick={() => deleteFavoriteAds()} text="Так" />
          <Button classBtn="btn-white btn-same-width" handelClick={() => closeModal(false)} text="Скасувати" />
        </div>
      </div>
    </div>
  );
}
