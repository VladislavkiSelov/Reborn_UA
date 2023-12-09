import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Pagination from 'components/Pagination/Pagination';
import CardProductCategory from 'components/CardProductCategory/CardProductCategory';
import BtnGreen from 'components/BtnGreen/BtnGreen';
import { Oval } from 'react-loader-spinner';
import { ReactComponent as ArrowDown } from '../../images/arrow_down.svg';
import './CategoryPage.scss';

export default function CategoryPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [arrayProducts, setArrayProducts] = useState([]);
  const [responseServe, setResponseServe] = useState([]);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('POPULARITY');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  function CheckSort(e) {
    setSort(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://ec2-18-197-60-214.eu-central-1.compute.amazonaws.com/api/v1/public/products/listing?category=${params.categoryId}&page=${page}&size=6&sort=${sort}`
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
  }, [params, page, sort, navigate]);

  const onSubmit = data => {
    console.log(data);
    reset();
  };

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
      <h5>Головна сторінка/Категорія {getTypeCategory(params.categoryId)}</h5>
      <div className="header_category">
        <Pagination
          maxElementPage={responseServe.totalElements}
          setPage={value => setPage(value)}
        />
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
        <aside>
          <div className="filter_wrapper">
            <h3>Фільтри:</h3>
            <form className="form_filter" onSubmit={handleSubmit(onSubmit)}>
              <label className="label_city">
                Місто
                <input type="text" {...register('city')} />
              </label>
              <h4>Стан</h4>
              <div className="box_input_checkbox_filter">
                <label className="checkbox_label">
                  <input
                    type="checkbox"
                    className="input_checkbox"
                    {...register('newState')}
                  />
                  <span className="check_box"></span>
                  <p>новий в гарному стані</p>
                </label>
                <label className="checkbox_label">
                  <input
                    type="checkbox"
                    className="input_checkbox"
                    {...register('used')}
                  />
                  <span className="check_box"></span>
                  <p>б/у</p>
                </label>
                <label className="checkbox_label">
                  <input
                    type="checkbox"
                    className="input_checkbox"
                    {...register('damaged')}
                  />
                  <span className="check_box"></span>
                  <p>пошкоджений</p>
                </label>
              </div>
              <BtnGreen text="Показати результати" />
            </form>
          </div>
        </aside>
        <div className="cards_category">
          {arrayProducts.map((el, i) => (
            <CardProductCategory
            categoryId={params.categoryId}
            reference={el.reference}
              key={i}
              productTitle={el.productTitle}
              productDescription={el.productDescription}
              city={el.city}
              state={el.state}
              el={el}
            />
          ))}
          <div className="footer_category">
          <Pagination
            maxElementPage={responseServe.totalElements}
            setPage={value => setPage(value)}
          />
        </div>
        </div>
      </div>
    </div>
  );
}
