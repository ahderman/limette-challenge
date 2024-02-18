import React from 'react';
import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { useTracker } from 'meteor/react-meteor-data';

import {
  Appointment,
  AppointmentCollection,
} from '/imports/db/AppointmentCollection';
import { AppointmentListItem } from '/imports/ui/components/AppointmentListItem';

interface Props {
  filterText: string;
}

interface TrackerReturnValue {
  isLoading: boolean;
  appointments: Appointment[] | undefined;
}

export const AppointmentList = ({ filterText }: Props) => {
  const { isLoading, appointments }: TrackerReturnValue = useTracker(() => {
    const handle = Meteor.subscribe('appointments');

    if (!handle.ready()) {
      return { isLoading: true };
    }
    try {
      const appointments = AppointmentCollection.find(
        {
          $or: [
            { patientFirstName: { $regex: `^${filterText}`, $options: 'i' } },
            { patientLastName: { $regex: `^${filterText}`, $options: 'i' } },
          ],
        },
        { sort: { date: 1 } }
      ).fetch();

      return { isLoading: false, appointments };
    } catch (e) {
      console.error('An error occurred: ', e);
      return { isLoading: false };
    }
  });

  return (
    <div className="appointment-list-container" data-cy="appointment-list">
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
