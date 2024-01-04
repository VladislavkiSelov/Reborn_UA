import './scss/reset.scss';
import './scss/fonts.scss';
import './scss/index.scss';
import './scss/App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from 'store/sliceReducer/sliceUser';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import MainPage from 'page/MainPage/MainPage';
import CategoryPage from 'page/CategoryPage/CategoryPage';
import ProductPage from 'page/ProductPage/ProductPage';
import ErrorPage from 'page/ErrorPage/ErrorPage';
import OwnCabinetPage from 'page/OwnOfficePage/OwnCabinetPage';
import FavoritePage from 'page/FavoritePage/FavoritePage';
import AddAdvertPage from 'page/AddAdvertPage/AddAdvertPage';
import axios from 'axios';

export const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const statusProfile = useSelector(state => state.statusProfile.statusProfile);
  console.log(statusProfile);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user'));
    if (userId === null) {
      dispatch(setUser({}));
      return;
    }

    if (Object.keys(userId).length > 0) {
      const url = `http://ec2-18-197-60-214.eu-central-1.compute.amazonaws.com/api/v1/public/users/${userId.userReference}`;
      axios.get(url).then(res => {
        dispatch(setUser(res.data));
      });
    }
  }, []);

  console.log(user);

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/category/:categoryId" element={<CategoryPage />}></Route>
          <Route path="/category/:categoryId/product/:productId" element={<ProductPage />}></Route>
          <Route path="/favorite" element={<FavoritePage />}></Route>
          <Route path="/own-cabinet" element={<OwnCabinetPage />}></Route>
          <Route path="/add-advert" element={<AddAdvertPage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
