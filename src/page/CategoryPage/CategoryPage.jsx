import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from 'components/Pagination/Pagination';
import CardProductCategory from 'components/CardProductCategory/CardProductCategory';
import FilterProduct from 'components/FilterProduct/FilterProduct';
import { Oval } from 'react-loader-spinner';
import translationCategory from 'components/TranslationText/TranslationCategory';
import { ReactComponent as ArrowDown } from '../../images/arrow_down.svg';
import './CategoryPage.scss';

export default function CategoryPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [arrayProducts, setArrayProducts] = useState([]);
  const [responseServe, setResponseServe] = useState([]);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('POPULARITY');

  function CheckSort(e) {
    setSort(e.target.value);
  }

  useEffect(() => {
    if (params.categoryId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://back.komirka.pp.ua/api/v1/public/products/listing?category=${params.categoryId}&page=${page}&size=6&sort=${sort}`);
          const data = await response.json();
          setResponseServe(data);
          setArrayProducts(data.content);
        } catch (error) {
          console.error('Error fetching data:', error);
          navigate('*');
        }
      };
      fetchData();
    }
    if (params.seachProduct) {
      const url = `https://back.komirka.pp.ua/api/v1/public/products/search?product-title=${encodeURIComponent(params.seachProduct)}&city=CHERNIVTSI&page=0&size=20`;
      const fetchData = async () => {
        const res = await fetch(url);
        const data = await res.json();
        setResponseServe(data);
        setArrayProducts(data.content);
        if (data.content.length === 0) {
          navigate('*');
        }
      };
      fetchData();
    }
  }, [params, page, sort, navigate]);

  if (arrayProducts.length === 0) {
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
    <div className="category container">
      <h5>Головна сторінка/Категорія {translationCategory(params.categoryId)}</h5>
      <div className="header_category">
        <Pagination maxElementPage={responseServe.totalElements} setPage={value => setPage(value)} />
        <div className="box_sort_category_page">
          <h5>Сортувати за:</h5>
          <div className="wrapper_select">
            <div className="select_arrow_down">
              <ArrowDown />
            </div>
            <select onChange={e => CheckSort(e)}>
              <option value="POPULARITY">Популярніші</option>
              <option value="DATE">Дата</option>
            </select>
          </div>
        </div>
      </div>
      <div className="сategory_main_box">
        <FilterProduct arrayProducts={arrayProducts} setArrayProducts={value => setArrayProducts(value)} />
        <div className="cards_category">
          {arrayProducts.map((el, i) => (
            <CardProductCategory
              key={el.reference}
              categoryId={params.categoryId || el.categoryName}
              seachProduct={params.seachProduct}
              reference={el.reference}
              productTitle={el.productTitle}
              productDescription={el.productDescription}
              city={el.city}
              state={el.state}
              el={el}
            />
          ))}
          <div className="footer_category">{/* <Pagination maxElementPage={responseServe.totalElements} setPage={value => setPage(value)} /> */}</div>
        </div>
      </div>
    </div>
  );
}
