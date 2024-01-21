import React from 'react';
import './AddSuccesModal.scss';
import Button from 'components/Button/Button';

export default function AddSuccesModal() {

  return (
    <div className="succesModal" >
      <div className="confirmation">
        <h2 className="confirmation__title">Ваше оголошення <br></br>успішно додано до сайту:)<br></br>Нагадуємо що сайт не має на меті комерційні продажі, тому повідомлення з вказанням ціни та використання в оголошеннях слово “продаж” “реалізація” не будуть публікуватися.
</h2>
        <div className="confirmation__btn">
          <Button classBtn="btn-blue btn-same-width" text="Ок" />
        </div>
      </div>
    </div>
  );
}
