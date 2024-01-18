import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CloseSvg } from '../../images/Close.svg';
import SignUp from 'components/SignUp/SignUp';
import LogIn from 'components/LogIn/LogIn';
import { setStatusProfile } from 'store/sliceStatusProfile/sliceStatusProfile';
import './Authentication.scss';
import { useDispatch, useSelector } from 'react-redux';

export default function Authentication() {
  const [statusAuthentication, setStatusAuthentication] = useState('LogIn');
  const statusProfile = useSelector(state => state.statusProfile.statusProfile);
  const dispatch = useDispatch();
  function closePage() {
    dispatch(setStatusProfile(false));
  }

  if (statusProfile) {
    return (
      <>
        <div onClick={closePage} className="wrapper_modal_authentication"></div>
        <div className="log_in">
          <CloseSvg onClick={closePage} className="close_btn" />
          <div className="header_log_in">
            <button onClick={() => setStatusAuthentication('LogIn')} className={statusAuthentication === 'LogIn' && 'active_btn_header_sing_up'}>
              Увійти
            </button>
            <button onClick={() => setStatusAuthentication('SignUp')} className={statusAuthentication === 'SignUp' && 'active_btn_header_sing_up'}>
              Зареєструватися
            </button>
          </div>
          {statusAuthentication === 'LogIn' && <LogIn />}
          {statusAuthentication === 'SignUp' && <SignUp />}
          <p>
            Під час входу ви погоджуєтесь з нашими <Link onClick={closePage} to="PrivacyPolicy">Умовами користування</Link>
          </p>
        </div>
      </>
    );
  }
}
