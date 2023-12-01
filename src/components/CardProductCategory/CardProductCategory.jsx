import React from 'react';
import './CardProductCategory.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Like } from '../../images/heart.svg';

export default function CardProductCategory({
  productTitle,
  productDescription,
  city,
  state,
  reference,
  categoryId
}) {
  return (
    <Link to={`/category/${categoryId}/product/${reference}`}>
      <div className="card_product_category">
        <div className="box_img_card_product_category">
          <img src="/img/img_furniture.png" alt="#" />
        </div>
        <div className="card_product_category_content">
          <h2>{productTitle}</h2>
          <div>
            <h4>Стан - {state}</h4>
            <div className="location_card_product_category">
              <img src="/img/location.svg" alt="location" />
              <h5> {city} </h5>
            </div>
          </div>
          <p>{productDescription}</p>
          <Like className="like" />
        </div>
      </div>
    </Link>
  );
}
