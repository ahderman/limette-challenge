import React, { FormEvent, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Appointment } from '/imports/db/AppointmentCollection';

interface Props {
  appointment: Appointment;
  onCancel: () => void;
}

export const AppointmentEditor2 = ({ appointment, onCancel }: Props) => {
  const title = 'Edit appointment';
  const [firstName, setFirstName] = useState<string>(
    appointment.patientFirstName
  );
  const [lastName, setLastName] = useState<string>(appointment.patientLastName);
  const [date, setDate] = useState<Date>(appointment.date);

  function handleCancelButtonClick() {
    onCancel();
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);

    try {
      await Meteor.callAsync('appointments.edit', appointment._id, {
        patientFirstName: formData.get('firstName'),
        patientLastName: formData.get('lastName'),
        date: new Date(formData.get('date') as string),
      });
      console.log('Appointment updated');
      target.reset();
    } catch (e) {
      console.error('Error updating appointment');
    }
  }

  return (
    <div className="appointment-editor-container">
      <h2>{title}</h2>
      <form onSubmit={handleFormSubmit}>
        <span>
          <label htmlFor="firstName">Patient's first name</label>
          <input
            type="text"
            name="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </span>
        <span>
          <label htmlFor="lastName">Patient's last name</label>
          <input
            type="text"
            name="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </span>
        <span>
          <label htmlFor="date">Appointment date</label>
          <input
            type="date"
            name="date"
            required
            value={date.toISOString().substring(0, 10)}
            onChange={(e) => {
              console.log('e.target.valueAsDate!', e.target.valueAsDate!);
              if (e.target.valueAsDate) {
                setDate(e.target.valueAsDate);
              }
            }}
          />
        </span>
        <span>
          <button type="button" onClick={handleCancelButtonClick}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </span>
      </form>
    </div>
  );
};
