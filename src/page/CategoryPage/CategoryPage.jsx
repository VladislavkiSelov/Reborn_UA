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
  const [originArrayProducts, setOriginArrayProducts] = useState([]);
  const [responseServe, setResponseServe] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [sortList, setSortList] = useState(false);
  const [valueInputPagination, setValueInputPagination] = useState(1);
  const [sort, setSort] = useState('POPULARITY');

  function closeListCity(e) {
    if (e.target.classList.contains('choose-sort')) {
      return;
    }
    setSortList(false);
  }

  useEffect(() => {
    if (params.categoryId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://back.komirka.pp.ua/api/v1/public/products/listing?category=${params.categoryId}&page=${page}&size=${size}&sort=${sort}`);
          const data = await response.json();
          setResponseServe(data);
          setArrayProducts(data.content);
          setOriginArrayProducts(data.content);
        } catch (error) {
          console.error('Error fetching data:', error);
          navigate('*');
        }
      };

      fetchData();
    }

    if (params.seachProduct) {
      const url = `https://back.komirka.pp.ua/api/v1/public/products/search?product-title=${encodeURIComponent(params.seachProduct)}&city=${
        params.city
      }&page=${page}&size=${size}`;

      const fetchDataSeach = async () => {
        try {
          const res = await fetch(url);
          const data = await res.json();
          setResponseServe(data);
          setArrayProducts(data.content);
          setOriginArrayProducts(data.content);
        } catch (err) {
          console.log(`error fetch deach product`);
          navigate('*');
        }
      };

      fetchDataSeach();
    }
  }, [params, page, sort, navigate]);

  useEffect(() => {
    function clickBody(e) {
      closeListCity(e);
    }
    document.querySelector('body').addEventListener('click', clickBody);
    return () => {
      document.querySelector('body').removeEventListener('click', clickBody);
    };
  }, []);
  //закрываю список

  if (!arrayProducts) {
    navigate('*');
  }

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

  function openSortList() {
    if (sortList) {
      setSortList(false);
    } else {
      setSortList(true);
    }
  }

  function chooseSortValue(e) {
    if (e.target.textContent === 'Найновіші') {
      setSort('DATE');
    } else if (e.target.textContent === 'Популярні') {
      setSort('POPULARITY');
    }
    setSortList(false);
  }

  return (
    <div className="category container">
      <h5 className="navigation">
        Головна сторінка<span className="hidden">/Категорія {translationCategory(params.categoryId)}</span>
      </h5>
      <div className="category__header">
        <Pagination
          valueInput={valueInputPagination}
          setValueInput={value => setValueInputPagination(value)}
          size={size}
          maxElementPage={responseServe.totalElements}
          setPage={value => setPage(value)}
        />
        <div className="category__header-sort">
          <h5>Сортувати за:</h5>
          <div className="wrapper_select">
            <h4 onClick={openSortList} className="choose-sort">
              {sort === 'POPULARITY' ? 'Популярні' : 'Найновіші'}
            </h4>
            {sortList && (
              <ul onClick={e => chooseSortValue(e)} className="list-sort">
                <li>{sort !== 'POPULARITY' ? 'Популярні' : 'Найновіші'}</li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="category__main">
        <FilterProduct originArrayProducts={originArrayProducts} arrayProducts={arrayProducts} setArrayProducts={value => setArrayProducts(value)} />
        <div className="cards_category">
          {arrayProducts.map((el, i) => (
            <CardProductCategory
              images={el.images}
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
          <div className="category__footer">
            {' '}
            <Pagination
              valueInput={valueInputPagination}
              setValueInput={value => setValueInputPagination(value)}
              size={size}
              maxElementPage={responseServe.totalElements}
              setPage={value => setPage(value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
