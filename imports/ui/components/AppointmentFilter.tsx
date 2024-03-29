import React, { ChangeEvent } from 'react';

interface Props {
  onFilterTextChange: (text: string) => void;
}

export const AppointmentFilter = ({ onFilterTextChange }: Props) => {
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    onFilterTextChange(e.target.value);
  }

  return (
    <div className="appointment-filter-container">
      <input
        data-cy="appointment-filter"
        type="text"
        placeholder="Type here to filter"
        onChange={handleInputChange}
      />
    </div>
  );
};
