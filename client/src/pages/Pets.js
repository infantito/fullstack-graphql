import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import NewPet from '../components/NewPet';
import PetsList from '../components/PetsList';
import Issue from '../components/Issue';
import Loader from '../components/Loader';

const ALL_PETS = gql`
  query AllPets {
    pets {
      id
      name
      type
      img
    }
  }
`;

export default function Pets() {
  const [modal, setModal] = useState(false);
  const { data, loading, error } = useQuery(ALL_PETS);

  const handleSubmit = input => setModal(false);
  const handleCancel = _ => setModal(false);
  const handleModal = _ => setModal(true);

  if (loading) return <Loader />;
  if (error) return <Issue />;

  if (modal) {
    return (
      <div className="row center-xs">
        <div className="col-xs-8">
          <NewPet handleSubmit={handleSubmit} handleCancel={handleCancel} />
        </div>
      </div>
    );
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row between-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={handleModal}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} />
      </section>
    </div>
  );
}
