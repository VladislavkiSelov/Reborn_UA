import React from 'react';
import CardUser from 'components/CardUser/CardUser';
import CardProductCategory from 'components/CardProductCategory/CardProductCategory';
import './FavoritePage.scss';

export default function FavoritePage() {
  const allProducts = JSON.parse(localStorage.getItem('products')) || [];

  return (
    <div className="favorite container">
      <div>
        <CardUser />
      </div>
      <div className="favorite__box-product">
        {allProducts.map(el => (
          <CardProductCategory
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
