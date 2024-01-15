// import React, { useEffect, useState } from 'react';
// import CardUser from 'components/CardUser/CardUser';
// import CardFavorite from 'components/CardFavorite/CardFavorite';
// import './AdsPage.scss';
// import { useDispatch, useSelector } from 'react-redux';
// import { setFavoriteProducts } from 'store/sliceFavoriteProducts/sliceFavoriteProducts';

// export default function AdsPage() {
//   const dispatch = useDispatch();
//   const allProducts = useSelector(
//     state => state.favoriteProducts.favoriteProducts
//   );

//   useEffect(() => {
//     dispatch(
//       setFavoriteProducts(JSON.parse(localStorage.getItem('products')) || [])
//     );
//   }, [dispatch]);

//   return (
//     <div className="favorite container">
//       <div>
//         <CardUser />
//       </div>
//       <div className="favorite__box-product">
//         {allProducts.map(el => (
//           <CardFavorite
//             key={el.reference}
//             productTitle={el.productTitle}
//             productDescription={el.productDescription}
//             city={el.city}
//             state={el.state}
//             reference={el.reference}
//             categoryId={el.categoryName}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import CardUser from 'components/CardUser/CardUser';
import CardFavorite from 'components/CardFavorite/CardFavorite';
import './AdsPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteProducts } from 'store/sliceFavoriteProducts/sliceFavoriteProducts';
import axios from 'axios';

export default function AdsPage() {
  const dispatch = useDispatch();
  const [ads, setAds] = useState('Улюблене');
  const [allProducts, setAllProducts] = useState([]);
  const favoriteProducts = useSelector(state => state.favoriteProducts.favoriteProducts);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'));

    if (ads === 'Улюблене') {
      if (!user) {
        dispatch(setFavoriteProducts(JSON.parse(localStorage.getItem('products')) || []));
        setAllProducts(favoriteProducts);
      }
      if (user) {
        const url = `https://back.komirka.pp.ua/api/v1/private/products/favorite?size=6`;
        axios
          .get(url, { headers: { accept: `*/*`, Authorization: `Bearer ${token.authenticationToken}` } })
          .then(res => setAllProducts(res.data.content))
          .catch(() => console.error('error-favorite'));
      }
    }

    if (ads === 'Активні оголошення') {
      const url = `https://back.komirka.pp.ua/api/v1/private/products/active?page=0&size=6`;
      axios
        .get(url, { headers: { accept: `*/*`, Authorization: `Bearer ${token.authenticationToken}` } })
        .then(res => setAllProducts(res.data.content))
        .catch(() => console.error('error-active'));
    }

    if (ads === 'Архів оголошень') {
      const url = `https://back.komirka.pp.ua/api/v1/private/products/disabled?page=0&size=6`;
      axios
        .get(url, { headers: { accept: `*/*`, Authorization: `Bearer ${token.authenticationToken}` } })
        .then(res => setAllProducts(res.data.content))
        .catch(() => console.error('error-disable'));
    }
  }, [dispatch, ads, favoriteProducts, user]);

  function clickTypeAds(e) {
    setAds(e.target.textContent);
  }

  return (
    <div className="ads container">
      <div>
        <CardUser />
      </div>
      <div className="ads__wrapper">
        <div onClick={e => clickTypeAds(e)} className="ads__header">
          <p className="tab">Активні оголошення</p>
          <p className="tab active-tab">Улюблене</p>
          <p className="tab">Архів оголошень</p>
        </div>
        <div className="ads__box-product">
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
    </div>
  );
}
