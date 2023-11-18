import React from 'react'

export default function MainPageAboutUs() {
  return (
    <section className="aboutUs">
    <div className="container-fluid">
      <div className="aboutUsHolder">
        <h2 className="aboutUsTitle">Про нас</h2>
        <div className="aboutUsContent">
          <p className="aboutUsDiscription">
            Наша мета - дати нове життя старим речам + <br />
            допомогти Вам знайти щось особливе та ексклюзивне
          </p>
          <ul className="aboutUsList">
            <li className="aboutUsItem">
              Допомагаємо екології нашої планети користуючись тими <br />
              речами які вже були у споживанні
            </li>
            <li className="aboutUsItem">
              У нас є речі які ви дійсно більше ніде не знайдете
            </li>
            <li className="aboutUsItem">
              Заощаджуй кошти на подорожі, навчання та враження від життя
              разом з нами!
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  )
}
