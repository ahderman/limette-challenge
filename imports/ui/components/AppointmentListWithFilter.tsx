import React, { useState } from 'react';
import { AppointmentList } from '/imports/ui/components/AppointmentList';
import { AppointmentFilter } from '/imports/ui/components/AppointmentFilter';
import { Appointment } from '/imports/db/AppointmentCollection';

interface Props {
  onAppointmentSelect: (appointment: Appointment) => void;
}

export const AppointmentListWithFilter = ({ onAppointmentSelect }: Props) => {
  const [filterText, setFilterText] = useState<string>('');

  return (
    <div className="appointment-list-with-filter">
      <h2>Agenda</h2>
      <AppointmentFilter onFilterTextChange={setFilterText} />
      <AppointmentList
        filterText={filterText}
        onAppointmentSelect={onAppointmentSelect}
      />
    </div>
  );
};
