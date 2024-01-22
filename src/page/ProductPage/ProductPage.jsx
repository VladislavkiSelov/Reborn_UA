import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from 'components/Pagination/Pagination';
import CardProduct from 'components/CardProduct/CardProduct';
import Slider from 'components/Slider/Slider';
import Button from 'components/Button/Button';
import translationState from 'components/TranslationText/TranslationState';
import translationCategory from 'components/TranslationText/TranslationCategory';
import { ReactComponent as Like } from '../../images/heart.svg';
import AddFavorites from 'components/AddFavorites/AddFavorites';
import './ProductPage.scss';
import { useSelector } from 'react-redux';

export default function ProductPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [product, setProduct] = useState([]);
  const [arrayProducts, setArrayProducts] = useState([]);
  const [responseServe, setResponseServe] = useState([]);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://back.komirka.pp.ua/api/v1/public/products/${params.productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('*');
      }
    };
    fetchData();
  }, [params, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://back.komirka.pp.ua/api/v1/public/products/listing?category=${params.categoryId}&page=${page}&size=12&sort=POPULARITY`);
        const data = await response.json();
        setResponseServe(data);
        setArrayProducts(data.content);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('*');
      }
    };

    fetchData();
  }, [params, page, navigate]);

  if (product.length === 0) {
    return (
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperClass="container"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    );
  }

  return (
    <section className="product container">
      <h5>Головна сторінка/Категорія {translationCategory(params.categoryId)}</h5>
      <div className="product_main_block">
        <Slider />
        {/* <div className="box_img">
          <img src="/img/img_furniture.png" alt="#" />
        </div> */}
        <div className="wrapper_content_product">
          <div className="content_product">
            <div className="wrapper_content">
              <h3>{product.productTitle}</h3>
              <div>
                <div className="wrapper_location">
                  <img src="/img/location.svg" alt="location" />
                  <h4>{product.city}</h4>
                </div>
                <h5>Стан - {translationState(product.state)}</h5>
              </div>
              <p>{product.productDescription}</p>
            </div>
            <Like onClick={e => AddFavorites({ e, reference: product.reference, user, categoryId: product.categoryName, navigate })} className="like" />
          </div>
          <h4>{product.ownerUsername}</h4>
          <Button text="Зателефонувати" classBtn="btn-blue btn_call" />
        </div>
      </div>
      <div className="similar_ads">
        <h3>Схожі оголошення</h3>
        <div>
          {arrayProducts.map((el, i) => (
            <CardProduct
              categoryId={params.categoryId}
              reference={el.reference}
              key={i}
              productTitle={el.productTitle}
              city={el.city}
              titleImage={`/img/img_furniture.png`}
              el={el}
            />
          ))}
        </div>
        <div className="footer_category">
          <Pagination maxElementPage={responseServe.totalElements || null} setPage={value => setPage(value)} />
        </div>
      </div>
    </section>
  );
}
