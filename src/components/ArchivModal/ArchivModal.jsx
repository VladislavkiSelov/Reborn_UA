import React from 'react';
import './ArchivModal.scss';
import Button from 'components/Button/Button';

export default function ArchivModal({closeModal}) {

  return (
    <div className="archivModal" >
      <div className="confirmation">
        <h2 className="confirmation__title">Ваше оголошення додано до архіву, за потребою ви зможете його відновити. Прохання видаляти непотрібні оголошення, одночасно в архіві може бути не більше 5 - ти оголошень.</h2>
        <div className="confirmation__btn">
          <Button classBtn="btn-blue btn-same-width" handelClick={() => closeModal(false)} text="Ок" />
        </div>
      </div>
    </div>
  );
}
