import { Meteor } from 'meteor/meteor';
import {
  AppointmentCollection,
  NewAppointment,
} from '/imports/db/AppointmentCollection';

function ensureUserIsLoggedIn(userId: string | null) {
  if (userId === null) {
    throw new Meteor.Error('Not logged in');
  }
}

export function initializeAppointmentMethods(): void {
  Meteor.methods({
    async 'appointments.create'(appointmentData: NewAppointment) {
      ensureUserIsLoggedIn(this.userId);

      const appointmentId = await AppointmentCollection.insertAsync({
        ownerId: this.userId!,
        patientFirstName: appointmentData.patientFirstName,
        patientLastName: appointmentData.patientLastName,
        date: appointmentData.date,
      });

      return appointmentId;
    },
  });
}
