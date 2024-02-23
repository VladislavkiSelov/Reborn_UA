import React, { useEffect, useState } from 'react';
import CardUser from 'components/CardUser/CardUser';
import CardAds from 'components/CardAds/CardAds';
import './AdsPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Button from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function AdsPage() {
  const dispatch = useDispatch();
  const [ads, setAds] = useState('Улюблене');
  const [allProducts, setAllProducts] = useState([]);
  const [emptyProducts, setEmptyProducts] = useState('');
  const user = useSelector(state => state.user.user);
  const navigation = useNavigate();

  const ifEmpty =
    !allProducts || allProducts.length === 0 ? (
      <p className="empty-products">{emptyProducts}</p>
    ) : (
      allProducts.map(el => (
        <CardAds
          images={el.images || el.titleImage}
          ads={ads}
          key={el.reference}
          productTitle={el.productTitle}
          productDescription={el.productDescription}
          city={el.city}
          state={el.state}
          reference={el.reference}
          categoryId={el.categoryName}
          setAllProducts={value => setAllProducts(value)}
          getAllFavoriteProducts={() => getAllFavoriteProducts()}
          getAllActiveAds={() => {
            getAllActiveAds();
          }}
          getAllArchiveAds={() => getAllArchiveAds()}
        />
      ))
    );

  async function getAllFavoriteProducts() {
    const token = JSON.parse(localStorage.getItem('user'));
    const url = `https://back.komirka.pp.ua/api/v1/private/products/favorite?size=6`;
    const resultAxios = await axios
      .get(url, { headers: { accept: `*/*`, Authorization: `Bearer ${token.authenticationToken}` } })
      .then(res => {
        setAllProducts(res.data.content);
      })
      .catch(() => navigation('*'));
    return resultAxios;
  }

  async function getAllActiveAds() {
    const token = JSON.parse(localStorage.getItem('user'));
    const url = `https://back.komirka.pp.ua/api/v1/private/products/active?page=0&size=6`;
    const resultAxios = await axios
      .get(url, { headers: { accept: `*/*`, Authorization: `Bearer ${token.authenticationToken}` } })
      .then(res => {
        setAllProducts(res.data.content);
      })
      .catch(() => navigation('*'));
    return resultAxios;
  }

  async function getAllArchiveAds() {
    const token = JSON.parse(localStorage.getItem('user'));
    const url = `https://back.komirka.pp.ua/api/v1/private/products/disabled?page=0&size=6`;
    const resultAxios = await axios
      .get(url, { headers: { accept: `*/*`, Authorization: `Bearer ${token.authenticationToken}` } })
      .then(res => setAllProducts(res.data.content))
      .catch(() => navigation('*'));
    return resultAxios;
  }

  function checkUserSetProducts(getAllProduct) {
    if (Object.keys(user).length > 0) {
      getAllProduct();
    } else if (ads === 'Улюблене') {
      setAllProducts(JSON.parse(localStorage.getItem('products')));
    } else {
      setAllProducts([]);
    }
  }

  useEffect(() => {
    if (ads === 'Улюблене') {
      checkUserSetProducts(getAllFavoriteProducts);
    }

    if (ads === 'Активні оголошення') {
      checkUserSetProducts(getAllActiveAds);
    }

    if (ads === 'Архів оголошень') {
      checkUserSetProducts(getAllArchiveAds);
    }
  }, [dispatch, ads, user]);

  useEffect(() => {
    if (allProducts === null || allProducts.length === 0) {
      if (ads === 'Улюблене') {
        setEmptyProducts(`У вас немає улюблених оголошень, додавайте оголошення в улюблені натискаючи на `);
      }

      if (ads === 'Активні оголошення') {
        setEmptyProducts(`Активних оголошень поки немає, але ви можете виправити ситуацію:) `);
      }

      if (ads === 'Архів оголошень') {
        setEmptyProducts(`Наразі немає оголошень в архіві`);
      }
    }
  }, [allProducts, ads]);

  function clickTypeAds(e) {
    const element = e.target;
    if (element.classList.contains('tab')) {
      Array.from(document.querySelectorAll('.tab')).forEach(el => {
        el.classList.remove('active-tab');
      });
      element.classList.add('active-tab');
      setAds(element.textContent);
    }
  }

  return (
    <div className="ads container">
      <div>
        <CardUser />
      </div>
      <div className="ads__wrapper">
        <div onClick={e => clickTypeAds(e)} className="ads__header">
          <p className={`tab`}>Активні оголошення</p>
          <p className={`tab active-tab`}>Улюблене</p>
          <p className={`tab`}>Архів оголошень</p>
        </div>
        <div className="ads__box-product">{ifEmpty}</div>
        <Button text="На головну сторінку" classBtn="btn-green btn_go-home" handelClick={() => navigation('/')} />
      </div>
    </div>
  );
}
