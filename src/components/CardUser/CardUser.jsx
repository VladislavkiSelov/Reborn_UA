import React from 'react';
import Button from 'components/Button/Button';
import { ReactComponent as UserProfil } from '../../images/user_cabinet.svg';
import { ReactComponent as UserEmail } from '../../images/mail.svg';
import { ReactComponent as UserPhone } from '../../images/phone.svg';
import './CardUser.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CardUser({statusBtn}) {
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate()

  if (Object.keys(user).length === 0) {
    return null;
  }

  function goEditInfoUser(){
    navigate('/own-cabinet')
  }

  return (
    <div className="card-user">
      <h3>Особисті дані</h3>
      <div>
        <UserProfil />
        <h4>{user.username}</h4>
      </div>
      <div>
        <UserPhone />
        <h4>{user.phoneNumber}</h4>
      </div>
      <div>
        <UserEmail />
        <h4>{user.email}</h4>
      </div>
      <Button statusDisabled={statusBtn}  classBtn="btn-blue" text="Редагувати" handelClick={goEditInfoUser} />
    </div>
  );
}
