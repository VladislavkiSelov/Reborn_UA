import React from 'react';
import './CardProductCategory.scss';
import translationState from 'components/TranslationText/TranslationState';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Like } from '../../images/heart.svg';
import { useSelector } from 'react-redux';

export default function CardProductCategory({ productTitle, productDescription, city, state, reference, categoryId, el }) {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);

  function goToAnotherPage(e) {
    if (e.target.classList.contains('like')) {
      if (!user) {
        const allProducts = JSON.parse(localStorage.getItem('products')) || [];
        const res = allProducts.find(item => item.reference === reference);
        if (res) {
          return;
        }
        const newAllProducts = [...allProducts, el];
        localStorage.setItem('products', JSON.stringify(newAllProducts));
        return;
      }

      if (user) {
        const url = `https://back.komirka.pp.ua/api/v1/private/products/${reference}/favorites`;
        const token = JSON.parse(localStorage.getItem('user')).authenticationToken;
        const fetchDate = async () => {
          await fetch(url, {
            method: 'POST',
            headers: { accept: '*/*', Authorization: `Bearer ${token}` },
          });
        };
        try {
          fetchDate();
        } catch (error) {
          console.error(error);
        }
        return;
      }
    }
    navigate(`/category/${categoryId}/product/${reference}`);
  }

  return (
    <div onClick={e => goToAnotherPage(e)} className="card_product_category">
      <div className="box_img_card_product_category">
        <img src="/img/img_furniture.png" alt="#" />
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
