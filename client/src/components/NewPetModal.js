import React from 'react';
import NewPet from './NewPet';

export default function NewPetModal({ handleSubmit, handleCancel }) {
  return (
    <div className="row center-xs">
      <div className="col-xs-8">
        <NewPet onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}
