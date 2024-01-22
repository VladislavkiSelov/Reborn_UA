import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Like } from '../../images/like_active.svg';
import { useSelector } from 'react-redux';
import Button from 'components/Button/Button';
import './CardAds.scss';
import axios from 'axios';

export default function CardAds({ ads, productTitle, productDescription, city, state, reference, categoryId, setAllProducts, getAllFavoriteProducts }) {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);

  const btnText = ads === 'Активні оголошення' ? 'Редагувати' : 'Відновити';

  function handelClick() {
    navigate(`/category/${categoryId}/product/${reference}`);
  }

  function deleteProduct() {
    if (Object.keys(user) <= 0) {
      const allProducts = JSON.parse(localStorage.getItem('products'));
      const newAllProducts = allProducts.filter(el => el.reference !== reference);
      localStorage.setItem('products', JSON.stringify(newAllProducts));
      setAllProducts(newAllProducts || []);
    }
    if (Object.keys(user) > 0) {
      const url = `https://back.komirka.pp.ua/api/v1/private/products/${reference}/favorites`;
      const token = JSON.parse(localStorage.getItem('user')).authenticationToken;
      axios
        .delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          (async function () {
            setAllProducts(await getAllFavoriteProducts());
          })();
        })
        .catch(error => console.error(error));
    }
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
      <div className="card-favorite__container_btn">
        <button onClick={deleteProduct} className="btn-delete">
          Видалити
        </button>
        {ads !== 'Улюблене' && <Button text={btnText} classBtn="btn-blue" />}
      </div>
    </div>
  );
}
