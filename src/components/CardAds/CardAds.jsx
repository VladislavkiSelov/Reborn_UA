import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Like } from '../../images/like_active.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteProducts } from 'store/sliceFavoriteProducts/sliceFavoriteProducts';
import DeleteFromFav from 'components/DeleteFromFav/DeleteFromFav';
import './CardAds.scss';
import axios from 'axios';

export default function CardAds({ productTitle, productDescription, city, state, reference, categoryId, }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.favoriteProducts.favoriteProducts);
  const user = useSelector(state => state.user.user);
  const [openConfirm, setOpenConfirm] = useState(false);

  function handelClick() {
    navigate(`/category/${categoryId}/product/${reference}`);
  }

  // function deleteProduct() {
  //   if (!user) {
  //     const newAllProducts = allProducts.filter(el => el.reference !== reference);
  //     localStorage.setItem('products', JSON.stringify(newAllProducts));
  //     dispatch(setFavoriteProducts(newAllProducts) || []);
  //   }
  //   if (user) {
  //     const url = `https://back.komirka.pp.ua/api/v1/private/products/${reference}/favorites`;
  //     const token = JSON.parse(localStorage.getItem('user')).authenticationToken
  //     axios
  //       .delete(url, {
  //         headers:{Authorization: `Bearer ${token}`},
  //       })
  //       .then(res => {
  //         console.log(res);
  //       })
  //       .catch(error => console.error(error));
  //   }
  // }

  return (
    <div className="card-favorite" >
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
      <button onClick={() => setOpenConfirm(true)} className="card-favorite__btn-delete">
        Видалити
      </button>
      <div>
          {openConfirm && <DeleteFromFav closeModal={setOpenConfirm}/>}
        </div>
    </div>
  );
}
