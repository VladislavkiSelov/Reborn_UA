import React, { useState } from 'react';
import './DeleteFromFav.scss';
import Button from 'components/Button/Button';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function DeleteFromFav({ setAllProducts, getAllFavoriteProducts, reference, closeModal }) {
  const user = useSelector(state => state.user.user);
  const [isLoading, setIsLoading] = useState(false);

  function deleteProduct() {
    console.log(Object.keys(user));
    if (Object.keys(user).length <= 0) {
      const allProducts = JSON.parse(localStorage.getItem('products'));
      const newAllProducts = allProducts.filter(el => el.reference !== reference);
      localStorage.setItem('products', JSON.stringify(newAllProducts));
      setAllProducts(newAllProducts || []);
    }

    if (Object.keys(user).length > 0) {
      const url = `https://back.komirka.pp.ua/api/v1/private/products/${reference}/favorites`;
      const token = JSON.parse(localStorage.getItem('user')).authenticationToken;
      setIsLoading(true);
      axios
        .delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          (async function () {
            setAllProducts(await getAllFavoriteProducts());
            setIsLoading(false);
          })();
        })
        .catch(error => {
          setIsLoading(false);
          console.error(error);
        });
    }
  }

  return (
    <div className="DeleteFromFav">
      <div className="confirmation">
        <h2 className="confirmation__title">Оголошення буде видалено з улюбленого</h2>
        <div className="confirmation__btns">
          <Button classBtn="btn-blue btn-same-width" handelClick={() => deleteProduct()} text="Так" isLoading={isLoading} />

          <Button classBtn="btn-white btn-same-width" handelClick={() => closeModal(false)} text="Скасувати" />
        </div>
      </div>
    </div>
  );
}
