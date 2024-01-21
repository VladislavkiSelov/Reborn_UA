import React from 'react';
import './SellConfirmModal.scss';
import Button from 'components/Button/Button';

export default function sellConfirmModal() {

  return (
    <div className="sellConfirm" >
      <div className="confirmation">
        <h2 className="confirmation__title">Вдалось продати товар?</h2>
        <div className="confirmation__btns">
          <Button classBtn="btn-blue btn-same-width" text="Так" />

          <Button classBtn="btn-white btn-same-width" text="Скасувати" />
        </div>
      </div>
    </div>
  );
}
