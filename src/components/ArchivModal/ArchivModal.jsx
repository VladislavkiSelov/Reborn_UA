import React from 'react';
import './ArchivModal.scss';
import Button from 'components/Button/Button';

export default function ArchivModal({getAllActiveAds}) {

  return (
    <div className="archivModal" >
      <div className="confirmation">
        <h2 className="confirmation__title">Ваше оголошення додано до архіву, за потребою ви зможете його відновити. Прохання видаляти непотрібні оголошення, одночасно в архіві може бути не більше 6 - ти оголошень.</h2>
        <div className="confirmation__btn">
          <Button handelClick={()=>getAllActiveAds()} classBtn="btn-blue btn-same-width"  text="Ок" />
        </div>
      </div>
    </div>
  );
}
