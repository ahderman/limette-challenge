import React from 'react';
import { LogoutButton } from '/imports/ui/components/LogoutButton';
import { AppointmentList } from '/imports/ui/components/AppointmentList';

export const AppointmentsPage = () => {
  return (
    <div>
      <h1>LiMetTe</h1>
      <LogoutButton />
      <AppointmentList />
    </div>
  );
};
