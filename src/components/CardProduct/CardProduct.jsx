import React from 'react';
import { Link } from 'react-router-dom';
import './CardProduct.scss';

export default function CardProduct({
  productTitle,
  city,
  titleImage,
  categoryId,
  reference,
}) {
  function handelClick() {}
  return (
    <Link to={`/category/${categoryId}/product/${reference}`}>
      <div className="card_product">
        <div className="box_img_product_card">
          <img src={titleImage} alt={productTitle} />
        </div>
        <h4>{productTitle}</h4>
        <div className="box_location">
          <img src="/img/location_card_product.svg" alt="#" />
          <h5>{city} - 31.10.23</h5>
        </div>
        <button onClick={() => handelClick()}>
          <img src="/img/heart.svg" alt="like" className="like" />
        </button>
      </div>
    </Link>
  );
}
