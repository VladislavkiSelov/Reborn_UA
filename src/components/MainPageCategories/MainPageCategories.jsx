import React from 'react';
import './MainPageCategories.scss'

export default function MainPageCategories() {
  const arrayCategories = [
    { text: 'Меблі', img: '/Reborn_UA/img/catagoty_1.svg',classCard:'furniture' },
    { text: 'Одяг', img: '/Reborn_UA/img/catagoty_2.svg', classCard:'cloth' },
    { text: 'Техніка', img: '/Reborn_UA/img/catagoty_3.svg', classCard:'machinery' },
    { text: 'Все для дому', img: '/Reborn_UA/img/catagoty_4.svg', classCard:'home' },
    { text: 'Дитячий світ', img: '/Reborn_UA/img/catagoty_5.svg', classCard:'kidsToys' },
    { text: 'Наші улюбленці', img: '/Reborn_UA/img/catagoty_6.svg', classCard:'animals' },
  ];

  return (
    <div className="categories container">
      <h2>Категорії</h2>
      <div className="wrapper_categories">
        {arrayCategories.map((el, i) => (
          <div key={i} className={`card_${el.classCard}`}>
            <img src={el.img} alt={el.text} />
            <h3>{el.text}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}