import React, { useState } from 'react';
// @ts-ignore
import { useTracker } from 'meteor/react-meteor-data';

import { LogoutButton } from '/imports/ui/components/LogoutButton';
import { AppointmentList } from '/imports/ui/components/AppointmentList';
import { AppointmentFilter } from '/imports/ui/components/AppointmentFilter';
import * as auth from '/imports/api/auth';

export const AppointmentsPage = () => {
  const [filterText, setFilterText] = useState<string>('');

  const currentUser = useTracker(auth.getCurrentUser);

  return (
    <div>
      <header>
        <h1>LiMetTe</h1>
        <p>
          ☻ Logged in as <em>{currentUser?.username}</em>
        </p>
        <LogoutButton />
      </header>

      <AppointmentFilter onFilterTextChange={setFilterText} />
      <AppointmentList filterText={filterText} />
    </div>
  );
};
