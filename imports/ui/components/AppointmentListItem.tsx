import React from 'react';
import { DateTime } from 'luxon';
import { Appointment } from '/imports/db/AppointmentCollection';

interface Props {
  appointment: Appointment;
}

export const AppointmentListItem = ({ appointment }: Props) => {
  const displayDate = DateTime.fromJSDate(appointment.date)
    .setLocale('en-GB')
    .toLocaleString({ day: '2-digit', month: 'long', year: 'numeric' });

  const displayName = `${appointment.patientFirstName} ${appointment.patientLastName}`;

  return (
    <div className="appointment-list-item">
      <span className="appointment-list-item-date">{displayDate}</span>
      <span className="appointment-list-item-name">{displayName}</span>
    </div>
  );
};
