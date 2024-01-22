import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Like } from '../../images/like_active.svg';
import Button from 'components/Button/Button';
import DeleteFromFav from 'components/DeleteFromFav/DeleteFromFav';
import './CardAds.scss';

export default function CardAds({ ads, productTitle, productDescription, city, state, reference, categoryId, setAllProducts, getAllFavoriteProducts }) {
  const navigate = useNavigate();
  const [statusDeleteModal, setStatusDeleteModal] = useState(false);

  const btnText = ads === 'Активні оголошення' ? 'Редагувати' : 'Відновити';

  function handelClick() {
    navigate(`/category/${categoryId}/product/${reference}`);
  }

  return (
    <>
      {statusDeleteModal && (
        <DeleteFromFav
          setAllProducts={setAllProducts}
          getAllFavoriteProducts={getAllFavoriteProducts}
          reference={reference}
          closeModal={value => setStatusDeleteModal(value)}
        />
      )}
      <div className="card-favorite">
        <div onClick={handelClick} className="card-favorite__wrapper">
          <div className="card-favorite__box_img">
            <img src="/img/img_furniture.png" alt="#" />
          </div>
          <div className="card-favorite__content">
            <h2>{productTitle}</h2>
            <div>
              <h4>Стан - {state}</h4>
              <div className="card-favorite__location">
                <img src="/img/location.svg" alt="location" />
                <h5> {city} </h5>
              </div>
            </div>
            <p>{productDescription}</p>
          </div>
        </div>
        <Like className="like" />
        <div className="card-favorite__container_btn">
          <button onClick={() => setStatusDeleteModal(true)} className="btn-delete">
            Видалити
          </button>
          {ads !== 'Улюблене' && <Button text={btnText} classBtn="btn-blue" />}
        </div>
      </div>
    </>
  );
}
