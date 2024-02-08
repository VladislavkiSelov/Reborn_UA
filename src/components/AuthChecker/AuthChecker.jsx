import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/sliceReducer/sliceUser';

export default function AuthChecker() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user'));

    const fetchData = async () => {
      const url = `https://back.komirka.pp.ua/api/v1/public/users/${userId.userReference}`;
      try {
        const res = await axios.get(url);
        dispatch(setUser(res.data));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (!userId) {
      dispatch(setUser({}));
      return;
    }

    if (Object.keys(userId).length > 0) {
      fetchData();

      setInterval(async () => {
        const userRefreshToken = JSON.parse(localStorage.getItem('user'));
        const url = `https://back.komirka.pp.ua/api/v1/public/refreshtoken`;
        try {
          const res = await axios.post(
            url,
            { refreshToken: userRefreshToken.refreshToken },
            {
              headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }
          );
          localStorage.setItem('user', JSON.stringify(res.data));
          dispatch(setUser(res.data));
        } catch (error) {
          console.error('Error refreshToken:', error);
        }
      }, 1 * 60 * 60 * 1000);
    }
  }, [dispatch]);
  //проверка пользователя
}
