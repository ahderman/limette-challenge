import { Meteor } from 'meteor/meteor';
import {
  AppointmentCollection,
  AppointmentData,
} from '/imports/db/AppointmentCollection';

function ensureUserIsLoggedIn(userId: string | null) {
  if (userId === null) {
    throw new Meteor.Error('Not logged in');
  }
}

async function ensureUserIsAppointmentOwner(
  userId: string,
  appointmentId: string
) {
  const appointment = await AppointmentCollection.findOneAsync({
    _id: appointmentId,
    ownerId: userId,
  });

  if (appointment === undefined) {
    throw new Meteor.Error('Access denied');
  }
}

export function initializeAppointmentMethods(): void {
  Meteor.methods({
    async 'appointments.create'(appointmentData: AppointmentData) {
      ensureUserIsLoggedIn(this.userId);

      const appointmentId = await AppointmentCollection.insertAsync({
        ownerId: this.userId!,
        patientFirstName: appointmentData.patientFirstName,
        patientLastName: appointmentData.patientLastName,
        date: appointmentData.date,
      });

      return appointmentId;
    },
    async 'appointments.edit'(
      appointmentId: string,
      appointmentData: AppointmentData
    ) {
      ensureUserIsLoggedIn(this.userId);

      await ensureUserIsAppointmentOwner(this.userId!, appointmentId);

      await AppointmentCollection.updateAsync(appointmentId, {
        $set: {
          patientFirstName: appointmentData.patientFirstName,
          patientLastName: appointmentData.patientLastName,
          date: appointmentData.date,
        },
      });
    },
  });
}
