import './Footer.scss';

export const Footer = () => {
  return (
    <div className="wrapper_footer">
      <footer className="footer container">
        <div className="logo_footer">
          <img src="/Reborn_UA/img/logo_white.svg" alt="" />
        </div>
        <nav className="nav_footer">
          <div className='nav_left'>
            <ul>
              <li>Меблі</li>
              <li>Одяг</li>
              <li>Техніка</li>
              <li>Все для дому</li>
              <li>Дитячий світ</li>
              <li>Домашні улюбленці</li>
            </ul>
            <ul>
              <li>Улюблене</li>
              <li>Мій кабінет</li>
              <li>Про нас</li>
              <li>Умови використання</li>
              <li>Політика конфіденційності</li>
            </ul>
          </div>
          <ul>
            <li>Допомога</li>
            <li>Зворотній зв’язок</li>
          </ul>
        </nav>
        <h3>Друге життя речей</h3>
      </footer>
    </div>
  );
};