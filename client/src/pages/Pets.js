import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import NewPet from '../components/NewPet';
import PetsList from '../components/PetsList';
import Issue from '../components/Issue';
import Loader from '../components/Loader';

const PETS_FIELDS = gql`
  fragment PetsFields on Pet {
    id
    name
    type
    img
    vaccinated @client
    owner {
      username
      # directive @client
      # In this case is because of the extend an age
      age @client
    }
  }
`;

const ALL_PETS = gql`
  query AllPets {
    pets {
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`;

const ADD_PET = gql`
  mutation AddPet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`;

export default function Pets() {
  const [modal, setModal] = useState(false);
  const { data, loading, error } = useQuery(ALL_PETS);
  const [createPet, newPet] = useMutation(ADD_PET, {
    update(cache, { data: { addPet } }) {
      const { pets } = cache.readQuery({ query: ALL_PETS });
      cache.writeQuery({
        query: ALL_PETS,
        data: { pets: [addPet, ...pets] },
      });
    },
    // if you put optimisticResponse here as well,
    // then it will be rewritten by the mutation optimisticResponse
    // optimisticResponse: {},
  });

  const handleSubmit = input => {
    setModal(false);
    createPet({
      variables: { newPet: input },
      optimisticResponse: {
        __typename: 'Mutation',
        addPet: {
          __typename: 'Pet',
          id: Date.now().toString(36),
          name: input.name,
          type: input.type,
          img: `https://source.unsplash.com/300x300/?${input.type.toLowerCase()}`,
        },
      },
    });
  };
  const handleCancel = _ => setModal(false);
  const handleModal = _ => setModal(true);

  if (loading) return <Loader />;
  if (error || newPet.error) return <Issue error={error || newPet.error} />;

  if (modal) {
    return (
      <div className="row center-xs">
        <div className="col-xs-8">
          <NewPet handleSubmit={handleSubmit} handleCancel={handleCancel} />
        </div>
      </div>
    );
  }

  console.log(data.pets[0]);

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
