import React from 'react';
import { Link } from 'react-router-dom';
import './MainPageCategories.scss';

export default function MainPageCategories() {
  const arrayCategories = [
    {
      text: 'Меблі',
      img: '/img/catagoty_1.svg',
      classCard: 'furniture',
      category: 'FURNITURE',
    },
    {
      text: 'Одяг',
      img: '/img/catagoty_2.svg',
      classCard: 'cloth',
      category: 'CLOTHE',
    },
    {
      text: 'Техніка',
      img: '/img/catagoty_3.svg',
      classCard: 'machinery',
      category: 'ELECTRONIC',
    },
    {
      text: 'Все для дому',
      img: '/img/catagoty_4.svg',
      classCard: 'home',
      category: 'HOSE',
    },
    {
      text: 'Дитячий світ',
      img: '/img/catagoty_5.svg',
      classCard: 'kidsToys',
      category: 'CHILDREN',
    },
    {
      text: 'Наші улюбленці',
      img: '/img/catagoty_6.svg',
      classCard: 'animals',
      category: 'PETS',
    },
  ];

  return (
    <section className="categories container">
      <h2>Категорії</h2>
      <div className="wrapper_categories">
        {arrayCategories.map((el, i) => (
          <Link
            key={i}
            className={`card_${el.classCard}`}
            to={`/category/${el.category}`}
          >
            <img src={el.img} alt={el.text} />
            <h3>{el.text}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
