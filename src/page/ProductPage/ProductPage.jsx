import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from 'components/Pagination/Pagination';
import CardProduct from 'components/CardProduct/CardProduct';
import Slider from 'components/Slider/Slider';
import BtnGreen from 'components/BtnGreen/BtnGreen';
import { ReactComponent as Like } from '../../images/heart.svg';
import './ProductPage.scss';

export default function ProductPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [product, setProduct] = useState([]);
  const [arrayProducts, setArrayProducts] = useState([]);
  const [responseServe, setResponseServe] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://ec2-18-197-60-214.eu-central-1.compute.amazonaws.com/api/v1/public/products/${params.productId}`
        );
        const data = await response.json();
        setResponseServe(data);
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
        const response = await fetch(
          `http://ec2-18-197-60-214.eu-central-1.compute.amazonaws.com/api/v1/public/products/listing?category=${params.categoryId}&page=${page}&size=12&sort=POPULARITY`
        );
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

  const getTypeCategory = category => {
    switch (category) {
      case 'FURNITURE':
        return 'Меблі';
        break;
      case 'CLOTHE':
        return 'Одяг';
        break;
      case 'ELECTRONIC':
        return 'Техніка';
        break;
      case 'HOSE':
        return 'Все для дому';
        break;
      case 'CHILDREN':
        return 'Дитячий світ';
        break;
      case 'PETS':
        return 'Наші улюбленці';
        break;
      default:
        return '';
    }
  };

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
      <h5>Головна сторінка/Категорія {getTypeCategory(params.categoryId)}</h5>
      <div className="product_main_block">
        <Slider/>
        {/* <div className="box_img">
          <img src="/img/img_furniture.png" alt="#" />
        </div> */}
        <div className="wrapper_content_product">
          <div className="content_product">
            <div className="wrapper_content">
              <h3>{product.productTitle}</h3>
              <div>
                <div className='wrapper_location'>
                <img src="/img/location.svg" alt="location" />
                <h4>{product.city}</h4>
                </div>
                <h5>{product.state}</h5>
              </div>
              <p>{product.productDescription}</p>
            </div>
            <Like className="like" />
          </div>
          <h4>{product.ownerUsername}</h4>
          <BtnGreen text="Зателефонувати" classBtn="btn_call" />
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
            />
          ))}
        </div>
        <div className="footer_category">
          <Pagination
            maxElementPage={responseServe.totalElements}
            setPage={value => setPage(value)}
          />
        </div>
      </div>
    </section>
  );
}
