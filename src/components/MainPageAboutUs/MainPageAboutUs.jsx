import React from 'react';
import './MainPageAboutUs.scss';

export default function MainPageAboutUs() {
  return (
    <div className="aboutUs">
      <div className="aboutUs_wrapper">
        <h2>Про нас</h2>
        <div className="aboutUsContent">
          <p>
            <span className="green">Наша мета </span>
             - дати нове життя старим речам + <br />
            допомогти Вам знайти щось особливе та ексклюзивне
          </p>
          <ul>
            <li>
              <img
                src="/img/material-symbols_menstrual-health.svg"
                alt="#"
              />
              Допомагаємо екології нашої планети користуючись тими <br />
              речами які вже були у споживанні
            </li>
            <li>
              <img
                src="/img/material-symbols_menstrual-health.svg"
                alt="#"
              />
              У нас є речі які ви дійсно більше ніде не знайдете
            </li>
            <li>
              <img
                src="/img/material-symbols_menstrual-health.svg"
                alt="#"
              />
              Заощаджуй кошти на подорожі, навчання та враження від життя разом
              з нами!
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
