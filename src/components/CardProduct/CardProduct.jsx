import React from 'react';
import './CardProduct.scss';

export default function CardProduct({ productTitle, city }) {
  return (
    <div className="card_product">
      <div className="box_img_product_card">
        <img src="/Reborn_UA/img/dog.png" alt={productTitle} />
      </div>
      <h4>{productTitle}</h4>
      <div className="box_location">
        <img src="/Reborn_UA/img/location_card_product.svg" alt="#" />
        <h5>{city} - 31.10.23</h5>
      </div>
      <button>
      <img src="/Reborn_UA/img/heart.svg" alt="like" className='like'/>
      </button>
    </div>
  );
}
