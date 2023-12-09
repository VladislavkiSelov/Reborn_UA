import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CardProduct.scss';

export default function CardProduct({
  productTitle,
  city,
  titleImage,
  categoryId,
  reference,
  el,
}) {
  const navigate = useNavigate();

  function goToAnotherPage(e) {
    if (e.target.classList.contains('like')) {
      console.log('like');
      const allProducts = JSON.parse(localStorage.getItem('products')) || [];
      const res = allProducts.find(item => item.reference === reference);
      if (res !== undefined) {
        return;
      }
      const newAllProducts = [...allProducts, el];
      localStorage.setItem('products', JSON.stringify(newAllProducts));
      return;
    }
    navigate(`/category/${categoryId}/product/${reference}`);
  }
  
  return (
    <div onClick={e => goToAnotherPage(e)} className="card_product">
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
