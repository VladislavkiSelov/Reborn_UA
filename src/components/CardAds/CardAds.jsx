import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Like } from '../../images/like_active.svg';
import NoImg from 'components/NoImg/NoImg';
import Button from 'components/Button/Button';
import DeleteFromFav from 'components/DeleteFromFav/DeleteFromFav';
import DeleteFromArch from 'components/DeleteFromArch/DeleteFromArch';
import ArchivModal from 'components/ArchivModal/ArchivModal';
import AdsrRestoredModal from 'components/AdsrRestoredModal/AdsrRestoredModal';
import './CardAds.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function CardAds({
  ads,
  productTitle,
  productDescription,
  city,
  state,
  reference,
  categoryId,
  setAllProducts,
  getAllFavoriteProducts,
  getAllActiveAds,
  getAllArchiveAds,
  images,
}) {
  const navigate = useNavigate();
  const [statusDeleteModal, setStatusDeleteModal] = useState(false);
  const [statusArchivModal, setStatusArchivModal] = useState(false);
  const [statusDeleteFromArch, setStatusDeleteFromArch] = useState(false);
  const [statusAdsrRestoredModal, setStatusAdsrRestoredModal] = useState(false);
  const user = useSelector(state => state.user.user);

  console.log(images);

  const img = images === 'cover image not presented' || images === undefined || images.length === 0 ? NoImg : images[0].imageUrl || images[0];

  console.log(img);

  function handelClick() {
    navigate(`/category/${categoryId}/product/${reference}`);
  }

  function deleteActiveAds() {
    const url = `https://back.komirka.pp.ua/api/v1/private/product/${reference}/DISABLED?period=30`;
    const token = JSON.parse(localStorage.getItem('user')).authenticationToken;
    axios
      .patch(url, null, {
        headers: {
          accept: `*/*`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setStatusArchivModal(true);
      })
      .catch(error => console.error(error));
  }

  function deleteArchivAds() {
    const url = `https://back.komirka.pp.ua/api/v1/private/product/${reference}`;
    const token = JSON.parse(localStorage.getItem('user')).authenticationToken;
    axios
      .delete(url, {
        headers: {
          accept: `*/*`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getAllArchiveAds();
        setStatusDeleteFromArch(false);
      })
      .catch(error => console.error(error));
  }

  function deleteFavoriteAds() {
    if (Object.keys(user).length === 0) {
      console.log('s');
      const allProducts = JSON.parse(localStorage.getItem('products'));
      const newAllProducts = allProducts.filter(el => el.reference !== reference);
      localStorage.setItem('products', JSON.stringify(newAllProducts));
      setAllProducts(newAllProducts || []);
      setStatusDeleteModal(false);
    }

    if (Object.keys(user).length > 0) {
      const url = `https://back.komirka.pp.ua/api/v1/private/products/${reference}/favorites`;
      const token = JSON.parse(localStorage.getItem('user')).authenticationToken;
      axios
        .delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          getAllFavoriteProducts();
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  function AdsrRestored() {
    const url = `https://back.komirka.pp.ua/api/v1/private/product/${reference}/ACTIVE?period=30`;
    const token = JSON.parse(localStorage.getItem('user')).authenticationToken;
    axios
      .patch(url, null, {
        headers: {
          accept: `*/*`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setStatusAdsrRestoredModal(false);
        getAllArchiveAds();
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      {statusDeleteModal && <DeleteFromFav deleteFavoriteAds={() => deleteFavoriteAds()} closeModal={value => setStatusDeleteModal(value)} />}
      {statusArchivModal && <ArchivModal getAllActiveAds={() => getAllActiveAds()} />}
      {statusDeleteFromArch && <DeleteFromArch deleteArchivAds={() => deleteArchivAds()} />}
      {statusAdsrRestoredModal && <AdsrRestoredModal AdsrRestored={() => AdsrRestored()} />}
      <div className="card-ads">
        <div onClick={handelClick} className="card-ads__wrapper">
          <div className="card-ads__box_img">
            <img src={img} alt="#" />
          </div>
          <div className="card-ads__content">
            <h2>{productTitle}</h2>
            <div>
              <h4>Стан - {state}</h4>
              <div className="card-ads__location">
                <img src="/img/location.svg" alt="location" />
                <h5> {city} </h5>
              </div>
            </div>
            <p>{productDescription}</p>
          </div>
        </div>
        <Like className="like" />
        <div className="card-ads__container_btn">
          {ads === 'Улюблене' && (
            <button onClick={() => setStatusDeleteModal(true)} className="btn-delete">
              Видалити
            </button>
          )}
          {ads === 'Активні оголошення' && <Button text={`Редагувати`} classBtn="btn-blue" />}
          {ads === 'Активні оголошення' && (
            <button onClick={deleteActiveAds} className="btn-delete">
              Видалити
            </button>
          )}
          {ads === 'Архів оголошень' && (
            <button onClick={() => setStatusDeleteFromArch(true)} className="btn-delete">
              Видалити
            </button>
          )}
          {ads === 'Архів оголошень' && <Button handelClick={() => setStatusAdsrRestoredModal(true)} text={`Відновити`} classBtn="btn-blue" />}
        </div>
      </div>
    </>
  );
}
