import React, {useState} from 'react';
import './DeleteFromFav.scss';
import Button from 'components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteProducts } from 'store/sliceFavoriteProducts/sliceFavoriteProducts';
import axios from 'axios';

export default function DeleteFromFav({closeModal, reference,}) {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.favoriteProducts.favoriteProducts);
  const user = useSelector(state => state.user.user);
  const [isLoading, setIsLoading] = useState(false);

  function deleteProduct() {
    setIsLoading(true)

    if (!user) {
      const newAllProducts = allProducts.filter(el => el.reference !== reference);
      localStorage.setItem('products', JSON.stringify(newAllProducts));
      dispatch(setFavoriteProducts(newAllProducts) || []);
      setIsLoading(false)
    }
    if (user) {
      const url = `https://back.komirka.pp.ua/api/v1/private/products/${reference}/favorites`;
      const token = JSON.parse(localStorage.getItem('user')).authenticationToken
      axios
        .delete(url, {
          headers:{Authorization: `Bearer ${token}`},
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.error(error)
          setIsLoading(false)
        });
    }
    setIsLoading(false)
  }

  return (
    <div className="DeleteFromFav" >
      <div className="confirmation">
        <h2 className="confirmation__title">Оголошення буде видалено з улюбленого</h2>
        <div className="confirmation__btns">
          <Button classBtn="btn-blue btn-same-width" handelClick={() => deleteProduct()} text="Так"  isLoading={isLoading} />

          <Button classBtn="btn-white btn-same-width" handelClick={() => closeModal(false)} text="Скасувати" />
        </div>
      </div>
    </div>
  );
}
