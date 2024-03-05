import React, { useState } from 'react';
import './CardProductCategory.scss';
import translationState from 'components/TranslationText/TranslationState';
import NoImg from 'components/NoImg/NoImg';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Like } from '../../images/heart.svg';
import { useSelector } from 'react-redux';
import ClickLikeAddFavorites from 'components/ClickLikeAddFavorites/ClickLikeAddFavorites';

export default function CardProductCategory({ productTitle, productDescription, city, state, reference, categoryId, el, images }) {
  const navigate = useNavigate();
  const [statusLike, setStatusLike] = useState(false);
  const user = useSelector(state => state.user.user);

  function handelClickLike() {
    console.log(statusLike);
    if (!statusLike) {
      setStatusLike(true);
    } else {
      setStatusLike(false);
    }
  }

  return (
    <div onClick={e => ClickLikeAddFavorites({ e, reference, user, categoryId, navigate, el })} className="card-product-category">
      <div className="card-product-category__box_img">
        <img src={images[0] || NoImg} alt="#" />
      </div>
      <div className="card-product-category__content">
        <h2>{productTitle}</h2>
        <div>
          <h4>Стан - {translationState(state)}</h4>
          <div className="card-product-category__location">
            <img src="/img/location.svg" alt="location" />
            <h5> {city} </h5>
          </div>
        </div>
        <p>{productDescription}</p>
        <button onClick={handelClickLike}>
        {!statusLike ? <img src="/img/heart.svg" alt="like" className="like" /> : <img src="/img/activeLike.png" alt="like" className="like" />}
      </button>
      </div>
    </div>
  );
}
