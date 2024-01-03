import './Footer.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className="wrapper_footer">
      <footer className="footer container">
        <div className="logo_footer">
          <img src="/img/logo_white.svg" alt="" />
        </div>
        <nav className="nav_footer">
          <div className="nav_left">
            <ul>
              <li>
                <Link to={`/category/FURNITURE`}>Меблі</Link>
              </li>
              <li>
                <Link to={`/category/CLOTHE`}>Одяг</Link>
              </li>
              <li>
                <Link to={`/category/ELECTRONIC`}>Техніка</Link>
              </li>
              <li>
                <Link to={`/category/HOSE`}>Все для дому</Link>
              </li>
              <li>
                <Link to={`/category/CHILDREN`}>Дитячий світ</Link>
              </li>
              <li>
                <Link to={`/category/PETS`}>Домашні улюбленці</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="favorite">Улюблене</Link>
              </li>
              <li>
                <Link to="own-cabinet">Мій кабінет</Link>
              </li>
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
