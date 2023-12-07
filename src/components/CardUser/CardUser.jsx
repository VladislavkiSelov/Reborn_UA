import React from 'react'
import BtnGreen from 'components/BtnGreen/BtnGreen';
import { ReactComponent as UserProfil } from '../../images/user_cabinet.svg';
import { ReactComponent as UserEmail } from '../../images/mail.svg';
import { ReactComponent as UserPhone } from '../../images/phone.svg';
import './CardUser.scss'

export default function CardUser({user}) {
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
    <BtnGreen text="Редагувати" />
  </div>
  )
}
