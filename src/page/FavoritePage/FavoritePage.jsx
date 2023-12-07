import React, { useEffect, useState } from 'react';
import CardUser from 'components/CardUser/CardUser';
import axios from 'axios';
import './FavoritePage.scss';

export default function FavoritePage() {
  //-----------------------------------------------
  const [user, setUser] = useState({});
  const userId = `9826e6a1-7d37-41cf-b7ed-1df3e2222b42`;
  const url = `http://ec2-18-197-60-214.eu-central-1.compute.amazonaws.com/api/v1/public/users/${userId}`;
  useEffect(() => {
    axios.get(url).then(res => setUser(res.data));
  }, [url]);
  //-----------------------------------------------

  
  return (
    <div className="favorite container">
      <div>
        <CardUser user={user} />
      </div>
      <div className="favorite__box-product"></div>
    </div>
  );
}
