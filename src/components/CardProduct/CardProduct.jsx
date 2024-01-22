import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CardProduct.scss';
import AddFavorites from 'components/AddFavorites/AddFavorites';
import { useSelector } from 'react-redux';

export default function CardProduct({ productTitle, city, titleImage, categoryId, reference, el }) {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);


  return (
    <div onClick={e => AddFavorites({ e, reference, user, categoryId, navigate })}  className="card_product">
      <div className="box_img_product_card">
        <img src={titleImage} alt={productTitle} />
      </div>
      <h4>{productTitle}</h4>
      <div className="box_location">
        <img src="/img/location_card_product.svg" alt="#" />
        <h5>{city} - 31.10.23</h5>
      </div>
      <button>
        <img src="/img/heart.svg" alt="like" className="like" />
      </button>
    </div>
  );
}
