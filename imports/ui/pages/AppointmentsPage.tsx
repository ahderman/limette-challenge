import React, { useState } from 'react';
import { LogoutButton } from '/imports/ui/components/LogoutButton';
import { AppointmentList } from '/imports/ui/components/AppointmentList';
import { AppointmentFilter } from '/imports/ui/components/AppointmentFilter';

export const AppointmentsPage = () => {
  const [filterText, setFilterText] = useState<string>('');

  return (
    <div>
      <h1>LiMetTe</h1>
      <LogoutButton />
      <AppointmentFilter onFilterTextChange={setFilterText} />
      <AppointmentList filterText={filterText} />
    </div>
  );
};
