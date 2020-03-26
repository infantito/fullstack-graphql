import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'CAT', label: 'Cat' },
  { value: 'DOG', label: 'Dog' },
];

export default function NewPet({
  handleSubmit: onSubmit,
  handleCancel: onCancel,
}) {
  const [type, setType] = useState('DOG');
  const [name, setName] = useState('');

  const activeOption = options.find(o => o.value === type);

  const handleChange = ({ value }) => setType(value);
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, type });
  };
  const handleCancel = e => {
    e.preventDefault();
    onCancel();
  };

  return (
    <div className="new-pet page">
      <h1>New Pet</h1>
      <div className="box">
        <form onSubmit={handleSubmit}>
          <Select
            value={activeOption}
            defaultValue={options[0]}
            onChange={handleChange}
            options={options}
          />

          <input
            className="input"
            type="text"
            placeholder="pet name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <a className="error button" onClick={handleCancel}>
            cancel
          </a>
          <button type="submit" name="submit">
            add pet
          </button>
        </form>
      </div>
    </div>
  );
}
