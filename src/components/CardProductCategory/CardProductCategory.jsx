import React from 'react';
import './CardProductCategory.scss';
import translationState from 'components/TranslationText/TranslationState';
import NoImg from '../../images/no_Photo.png';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Like } from '../../images/heart.svg';
import { useSelector } from 'react-redux';
import ClickLikeAddFavorites from 'components/ClickLikeAddFavorites/ClickLikeAddFavorites';

export default function CardProductCategory({ productTitle, productDescription, city, state, reference, categoryId, el, images }) {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);

  return (
    <div onClick={e => ClickLikeAddFavorites({ e, reference, user, categoryId, navigate, el })} className="card_product_category">
      <div className="box_img_card_product_category">
        <img src={images[0] || NoImg} alt="#" />
      </div>
      <div className="card_product_category_content">
        <h2>{productTitle}</h2>
        <div>
          <h4>Стан - {translationState(state)}</h4>
          <div className="location_card_product_category">
            <img src="/img/location.svg" alt="location" />
            <h5> {city} </h5>
          </div>
        </div>
        <p>{productDescription}</p>
        <Like className="like" />
      </div>
    </div>
  );
}
