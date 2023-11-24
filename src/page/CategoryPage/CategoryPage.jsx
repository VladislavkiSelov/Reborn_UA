import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Pagination from 'components/Pagination/Pagination';
import CardProductCategory from 'components/CardProductCategory/CardProductCategory';
import BtnGreen from 'components/BtnGreen/BtnGreen';
import './CategoryPage.scss';

export default function CategoryPage() {
  const params = useParams();
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
    fetch(
      `http://ec2-3-79-99-48.eu-central-1.compute.amazonaws.com/api/v1/public/products/listing?category=${params.categoryId}&page=${page}&size=6&sort=${sort}`
    )
      .then(res => res.json())
      .then(res => {
        setResponseServe(res);
        setArrayProducts(res.content);
      });
  }, [params, page, sort]);

  const onSubmit = data => {
    console.log(data);
    reset();
  };

  return (
    <div className="category container">
      <div className="header_category">
        <Pagination
          maxElementPage={responseServe.totalElements}
          setPage={value => setPage(value)}
        />
        <div className="box_sort_category_page">
          <h5>Сортувати за:</h5>
          <select onChange={e => CheckSort(e)}>
            <option value="POPULARITY">Популярніші</option>
            <option value="DATE">Дата</option>
          </select>
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
              key={i}
              productTitle={el.productTitle}
              productDescription={el.productDescription}
              city={el.city}
              state={el.state}
            />
          ))}
                {/* <div className="footer_category">
          <Pagination
            maxElementPage={responseServe.totalElements}
            setPage={value => setPage(value)}
          />
        </div> */}
        </div>
      </div>
    </div>
  );
}
