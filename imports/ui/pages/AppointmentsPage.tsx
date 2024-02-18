import React from 'react';
// @ts-ignore
import { useTracker } from 'meteor/react-meteor-data';

import { LogoutButton } from '/imports/ui/components/LogoutButton';
import { AppointmentListWithFilter } from '/imports/ui/components/AppointmentListWithFilter';
import { AppointmentEditor } from '/imports/ui/components/AppointmentEditor';
import * as auth from '/imports/api/auth';

export const AppointmentsPage = () => {
  const currentUser = useTracker(auth.getCurrentUser);

  return (
    <div className="appointments-page">
      <header>
        <div className="header-logo-wrapper">
          <h1>LiMetTe</h1>
        </div>

        <div className="header-current-user-wrapper">
          <p>
            ☻ Logged in as <em>{currentUser?.username}</em>
          </p>
        </div>
        <LogoutButton />
      </header>

      <AppointmentListWithFilter />
      <AppointmentEditor />
    </div>
  );
};
