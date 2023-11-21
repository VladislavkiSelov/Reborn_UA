import React, { useEffect, useState } from 'react';
import CardProduct from 'components/CardProduct/CardProduct';
import axios from 'axios';
import './MainPageNewAnnouncements.scss'

export default function MainPageNewAnnouncements() {
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    const apiUrl = `http://ec2-3-79-99-48.eu-central-1.compute.amazonaws.com/api/v1/public/products/newest?page=0&size=12`;
    axios.get(apiUrl).then(resp => {
      setAllProduct(resp.data.content);
    });
  }, [setAllProduct]);

  return (
    <div className="NewAnnouncements">
      <h2>Найновіші оголошення</h2>
      <div className="wrapper_card_product">
        {allProduct.map((el, i) => (
          <CardProduct key={i} productTitle={el.productTitle} city={el.city}/>
        ))}
      </div>
    </div>
  );
}
