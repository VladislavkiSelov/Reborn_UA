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
  const user = useSelector(state => state.user.user);
  const validUser = Object.keys(user);
  const navigation = useNavigate();

  async function getAllFavoriteProducts() {
    console.log('s');
    const token = JSON.parse(localStorage.getItem('user'));
    const url = `https://back.komirka.pp.ua/api/v1/private/products/favorite?size=6`;
    const resultAxios = await axios
      .get(url, { headers: { accept: `*/*`, Authorization: `Bearer ${token.authenticationToken}` } })
      .then(res => res.data.content)
      .catch(() => navigation('*'));
    return resultAxios;
  }

  async function getAllActiveAds() {
    const token = JSON.parse(localStorage.getItem('user'));
    const url = `https://back.komirka.pp.ua/api/v1/private/products/active?page=0&size=6`;
    const resultAxios = await axios
      .get(url, { headers: { accept: `*/*`, Authorization: `Bearer ${token.authenticationToken}` } })
      .then(res => res.data.content)
      .catch(() => navigation('*'));
    return resultAxios;
  }

  async function getAllArchiveAds() {
    const token = JSON.parse(localStorage.getItem('user'));
    const url = `https://back.komirka.pp.ua/api/v1/private/products/disabled?page=0&size=6`;
    const resultAxios = await axios
      .get(url, { headers: { accept: `*/*`, Authorization: `Bearer ${token.authenticationToken}` } })
      .then(res => res.data.content)
      .catch(() => navigation('*'));
    return resultAxios;
  }

  useEffect(() => {
    if (ads === 'Улюблене') {
      if (Object.keys(user) > 0) {
        (async function () {
          setAllProducts(await getAllFavoriteProducts());
        })();
      } else {
        setAllProducts(JSON.parse(localStorage.getItem('products')) || []);
      }
    }

    if (ads === 'Активні оголошення') {
      (async function () {
        setAllProducts(await getAllActiveAds());
      })();
    }

    if (ads === 'Архів оголошень') {
      (async function () {
        setAllProducts(await getAllArchiveAds());
      })();
    }
  }, [dispatch, ads, user]);

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
          <p className={`tab ${validUser.length <= 0  && 'disableTab'}`}>Активні оголошення</p>
          <p className={`tab active-tab ${validUser.length <= 0  && 'disableTab'}`}>Улюблене</p>
          <p className={`tab ${validUser.length <= 0  && 'disableTab'}`}>Архів оголошень</p>
        </div>
        <div className="ads__box-product">
          {allProducts.map(el => (
            <CardAds
              ads={ads}
              key={el.reference}
              productTitle={el.productTitle}
              productDescription={el.productDescription}
              city={el.city}
              state={el.state}
              reference={el.reference}
              categoryId={el.categoryName}
              setAllProducts={value => setAllProducts(value)}
              getAllFavoriteProducts={getAllFavoriteProducts}
            />
          ))}
        </div>
        <Button text="На головну сторінку" classBtn="btn-green btn_go-home" handelClick={() => navigation('/')} />
      </div>
    </div>
  );
}
