import React, { useEffect, useState } from 'react';
import CardProduct from 'components/CardProduct/CardProduct';
import axios from 'axios';
import './MainPageNewAnnouncements.scss';

export default function MainPageNewAnnouncements() {
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    const apiUrl = `https://back.komirka.pp.ua/api/v1/public/products/newest?page=0&size=12`;
    axios.get(apiUrl).then(resp => {
      setAllProduct(resp.data.content);
    });
  }, [setAllProduct]);

  console.log(allProduct);

  return (
    <div className="NewAnnouncements">
      <h2>Найновіші оголошення</h2>
      <div className="NewAnnouncements__wrapper-card">
        {allProduct.map((el, i) => (
          <CardProduct
            el={el}
            categoryId={el.categoryName}
            reference={el.reference}
            key={i}
            productTitle={el.productTitle}
            city={el.city}
            titleImage={el.titleImage}
            publishDate={el.publishDate}
          />
        ))}
      </div>
    </div>
  );
}
