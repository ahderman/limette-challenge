import React from 'react';
// @ts-ignore
import { useTracker } from 'meteor/react-meteor-data';

import { LoginPage } from '/imports/ui/pages/LoginPage';
import { AppointmentsPage } from '/imports/ui/pages/AppointmentsPage';
import * as auth from '/imports/api/auth';

export const AppointmentsApp = () => {
  const isLoggedIn = useTracker(auth.isUserLoggedIn);

  return !isLoggedIn ? <LoginPage /> : <AppointmentsPage />;
};
