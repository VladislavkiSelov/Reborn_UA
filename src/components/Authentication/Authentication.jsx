import React, { useState } from 'react';
import { ReactComponent as CloseSvg } from '../../images/Close.svg';
import SignUp from 'components/SignUp/SignUp';
import LogIn from 'components/LogIn/LogIn';
import './Authentication.scss';

export default function Authentication({ setStatusProfile }) {
  const [statusAuthentication, setStatusAuthentication] = useState('LogIn');
  function closePage() {
    setStatusProfile(false);
  }

  return (
    <>
      <div onClick={closePage} className="wrapper_modal_authentication"></div>
      <div className="log_in">
        <CloseSvg onClick={closePage} className="close_btn" />
        <div className="header_log_in">
          <button
            onClick={() => setStatusAuthentication('LogIn')}
            className={
              statusAuthentication === 'LogIn' && 'active_btn_header_sing_up'
            }
          >
            Увійти
          </button>
          <button
            onClick={() => setStatusAuthentication('SignUp')}
            className={
              statusAuthentication === 'SignUp' && 'active_btn_header_sing_up'
            }
          >
            Зареєструватися
          </button>
        </div>
        {statusAuthentication === 'LogIn' && <LogIn />}
        {statusAuthentication === 'SignUp' && <SignUp />}
        <p>
          Під час входу ви погоджуєтесь з нашими{' '}
          <a href="#">Умовами користування</a>
        </p>
      </div>
    </>
  );
}
