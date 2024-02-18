import React from 'react';

import { LoginForm } from '/imports/ui/components/LoginForm';

export const LoginPage = () => {
  return (
    <div className="login-page">
      <header>
        <div className="header-logo-wrapper">
          <h1>LiMetTe</h1>
        </div>
      </header>

      <LoginForm />
    </div>
  );
};
