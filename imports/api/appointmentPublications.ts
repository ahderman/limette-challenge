import { Meteor } from 'meteor/meteor';
import { AppointmentCollection } from '/imports/db/AppointmentCollection';

export function initializeAppointmentPublications() {
  Meteor.publish('appointments', function () {
    return AppointmentCollection.find({ ownerId: this.userId! });
  });
}
