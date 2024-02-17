import React from 'react';
import { Appointment } from '/imports/db/AppointmentCollection';

interface Props {
  appointment: Appointment;
}

export const AppointmentListItem = ({ appointment }: Props) => {
  return (
    <div>
      {`${appointment.date} ${appointment.patientFirstName} ${appointment.patientLastName}`}
    </div>
  );
};
