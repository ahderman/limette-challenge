import React, { useState } from 'react';
// @ts-ignore
import { useTracker } from 'meteor/react-meteor-data';

import { LogoutButton } from '/imports/ui/components/LogoutButton';
import { AppointmentListWithFilter } from '/imports/ui/components/AppointmentListWithFilter';
import { AppointmentCreator } from '/imports/ui/components/AppointmentCreator';
import * as auth from '/imports/api/auth';
import { Appointment } from '/imports/db/AppointmentCollection';
import { AppointmentEditor } from '/imports/ui/components/AppointmentEditor';

export const AppointmentsPage = () => {
  const currentUser = useTracker(auth.getCurrentUser);
  const [selectedAppointment, setSelectedAppointment] = useState<
    Appointment | undefined
  >();

  function onAppointmentSelect(appointment: Appointment): void {
    setSelectedAppointment(appointment);
  }

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

      <AppointmentListWithFilter onAppointmentSelect={onAppointmentSelect} />
      {selectedAppointment ? (
        <AppointmentEditor
          appointment={selectedAppointment}
          key={selectedAppointment._id}
          onCancel={() => setSelectedAppointment(undefined)}
        />
      ) : (
        <AppointmentCreator />
      )}
    </div>
  );
};
