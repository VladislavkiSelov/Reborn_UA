import React, { useState } from 'react';
import '../../css/App.css';
import ProfileIcon from '../../images/GeosIcon.png';

const ProfileButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>
        <img src={ProfileIcon} alt="profileImage" />
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span>Зарегистрироваться или войти</span>
              <button onClick={closeModal}>Закрыть</button>
            </div>
            <form>
              <div className="form-group">
                <label>Имя:</label>
                <input type="text" placeholder="Имя" />
              </div>
              <div className="form-group">
                <label>Фамилия:</label>
                <input type="text" placeholder="Фамилия" />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" placeholder="Email" />
              </div>
              <div className="form-group">
                <label>Пароль:</label>
                <input type="password" placeholder="Пароль" />
              </div>
              <div className="form-group">
                <label>Повторите пароль:</label>
                <input type="password" placeholder="Повторите пароль" />
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" /> Запомнить меня
                </label>
              </div>
              <div className="form-group">
                <button>Зарегистрироваться</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
