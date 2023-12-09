import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Like } from '../../images/like_active.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteProducts } from 'store/sliceFavoriteProducts/sliceFavoriteProducts';
import './CardFavorite.scss';

export default function CardFavorite({
  productTitle,
  productDescription,
  city,
  state,
  reference,
  categoryId,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProducts = useSelector(
    state => state.favoriteProducts.favoriteProducts
  );

  function handelClick() {
    navigate(`/category/${categoryId}/product/${reference}`);
  }

  function deleteProduct() {
    const newAllProducts = allProducts.filter(el => el.reference !== reference);
    localStorage.setItem('products', JSON.stringify(newAllProducts));
    dispatch(setFavoriteProducts(newAllProducts) || []);
  }

  return (
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
      <button onClick={deleteProduct} className="card-favorite__btn-delete">
        Видалити
      </button>
    </div>
  );
}
