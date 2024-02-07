import './scss/reset.scss';
import './scss/fonts.scss';
import './scss/index.scss';
import './scss/App.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import AuthChecker from 'components/AuthChecker/AuthChecker';

export const App = () => {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <AuthChecker />
        <ProtectedRoute />
        <Footer />
      </BrowserRouter>
    </div>
  );
};
