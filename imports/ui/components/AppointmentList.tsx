import React from 'react';
import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { useTracker } from 'meteor/react-meteor-data';

import {
  Appointment,
  AppointmentCollection,
} from '/imports/db/AppointmentCollection';
import { AppointmentListItem } from '/imports/ui/components/AppointmentListItem';

interface TrackerReturnValue {
  isLoading: boolean;
  appointments: Appointment[] | undefined;
}

export const AppointmentList = () => {
  const { isLoading, appointments }: TrackerReturnValue = useTracker(() => {
    const handle = Meteor.subscribe('appointments');

    if (!handle.ready()) {
      return { isLoading: true };
    }

    const appointments = AppointmentCollection.find(
      {},
      { sort: { date: 1 } }
    ).fetch();

    return { isLoading: false, appointments };
  });

  return (
    <div data-cy="appointment-list">
      <h2>Agenda</h2>
      {isLoading ? <div>Loading...</div> : null}
      <div>
        {appointments &&
          appointments.map((appointment) => (
            <AppointmentListItem
              appointment={appointment}
              key={appointment._id}
            />
          ))}
      </div>
    </div>
  );
};