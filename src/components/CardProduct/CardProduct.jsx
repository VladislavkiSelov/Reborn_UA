import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardProduct.scss';
import NoImg from 'components/NoImg/NoImg';
import ClickLikeAddFavorites from 'components/ClickLikeAddFavorites/ClickLikeAddFavorites';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';

export default function CardProduct({ productTitle, city, titleImage, categoryId, reference, el, publishDate }) {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);

  const img = titleImage === 'cover image not presented' || titleImage.length === 0 ? NoImg : titleImage;
  const date = moment(publishDate).format('YY.MM.DD');

  return (
    <div onClick={e => ClickLikeAddFavorites({ e, reference, user, categoryId, navigate, el })} className="card_product">
      <div className="card_product__box_img">
        <img src={img} alt={productTitle} />
      </div>
      <h4>{productTitle}</h4>
      <div className="card_product__location">
        <img src="/img/location_card_product.svg" alt="#" />
        <h5>
          {city} - {date}
        </h5>
      </div>
      <button>
        <img src="/img/heart.svg" alt="like" className="like" />
      </button>
    </div>
  );
}
