import React from 'react'

export default function MainPageCategories() {
  return (
    <section className="categories">
    <div className="container-fluid">
      <div className="cardsHolder">
        <div className="categoriesHeader">
          <h2>Категорії</h2>
        </div>
        <div className="categoryContainer">
          <div className="categoryContainerUpper">
            <div className="cardsCategories">
              <a className="card" href=" ">
                Меблі
              </a>
            </div>
            <div className="cardsCategories">
              <a className="card" href=" ">
                Одяг
              </a>
            </div>
            <div className="cardsCategories">
              <a className="card" href=" ">
                Техніка
              </a>
            </div>
          </div>
          <div className="categoryContainerLower">
            <div className="cardsCategories">
              <a className="card" href=" ">
                Все для дому
              </a>
            </div>
            <div className="cardsCategories">
              <a className="card" href=" ">
                Дитячий <br />
                світ
              </a>
            </div>
            <div className="cardsCategories">
              <a className="card" href=" ">
                Домашні <br />
                улюбленці
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
