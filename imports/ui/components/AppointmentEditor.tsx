import React, { FormEvent } from 'react';
import { Meteor } from 'meteor/meteor';

export const AppointmentEditor = () => {
  const title = 'Create appointment';

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);

    try {
      await Meteor.callAsync('appointments.create', {
        patientFirstName: formData.get('firstName'),
        patientLastName: formData.get('lastName'),
        date: new Date(formData.get('date') as string),
      });
      console.log('Appointment created');
      target.reset();
    } catch (e) {
      console.error('Error creating appointment');
    }
  }

  return (
    <div className="appointment-editor-container">
      <h2>{title}</h2>
      <form onSubmit={handleFormSubmit}>
        <span>
          <label htmlFor="firstName">Patient's first name</label>
          <input type="text" name="firstName" required />
        </span>
        <span>
          <label htmlFor="lastName">Patient's last name</label>
          <input type="text" name="lastName" required />
        </span>
        <span>
          <label htmlFor="date">Appointment date</label>
          <input type="date" name="date" required />
        </span>
        <span>
          <input type="reset" value="Cancel" />
          <button type="submit">Save</button>
        </span>
      </form>
    </div>
  );
};
