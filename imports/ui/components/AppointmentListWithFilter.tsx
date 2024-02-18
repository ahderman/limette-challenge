import React, { useState } from 'react';
import { AppointmentList } from '/imports/ui/components/AppointmentList';
import { AppointmentFilter } from '/imports/ui/components/AppointmentFilter';

export const AppointmentListWithFilter = () => {
  const [filterText, setFilterText] = useState<string>('');

  return (
    <div className="appointment-list-with-filter">
      <h2>Agenda</h2>
      <AppointmentFilter onFilterTextChange={setFilterText} />
      <AppointmentList filterText={filterText} />
    </div>
  );
};
