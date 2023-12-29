import React, { useEffect, useState } from 'react';
import CardUser from 'components/CardUser/CardUser';
import CardFavorite from 'components/CardFavorite/CardFavorite';
import './FavoritePage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteProducts } from 'store/sliceFavoriteProducts/sliceFavoriteProducts';

export default function FavoritePage() {
  const dispatch = useDispatch();
  const allProducts = useSelector(
    state => state.favoriteProducts.favoriteProducts
  );

  useEffect(() => {
    dispatch(
      setFavoriteProducts(JSON.parse(localStorage.getItem('products')) || [])
    );
  }, [dispatch]);

  console.log(allProducts);

  return (
    <div className="favorite container">
      <div>
        <CardUser />
      </div>
      <div className="favorite__box-product">
        {allProducts.map(el => (
          <CardFavorite
            key={el.reference}
            productTitle={el.productTitle}
            productDescription={el.productDescription}
            city={el.city}
            state={el.state}
            reference={el.reference}
            categoryId={el.categoryName}
          />
        ))}
      </div>
    </div>
  );
}
