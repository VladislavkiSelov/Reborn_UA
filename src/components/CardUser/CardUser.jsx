import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BtnGreen from 'components/BtnGreen/BtnGreen';
import { ReactComponent as UserProfil } from '../../images/user_cabinet.svg';
import { ReactComponent as UserEmail } from '../../images/mail.svg';
import { ReactComponent as UserPhone } from '../../images/phone.svg';
import './CardUser.scss'

export default function CardUser() {
  const [user, setUser] = useState({});
  const userId = JSON.parse(localStorage.getItem('user'));
  const url = `http://ec2-18-197-60-214.eu-central-1.compute.amazonaws.com/api/v1/public/users/${userId.userReference}`;

  useEffect(() => {
    axios.get(url).then(res => setUser(res.data));
  }, [url]);

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
