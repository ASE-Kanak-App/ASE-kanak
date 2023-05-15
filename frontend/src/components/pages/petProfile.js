import React from 'react';
import styled from 'styled-components';
import {useState} from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PetImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin-bottom: 1rem;
  box-shadow: 2px 2px 5px #ccc;
`;

const PetDescription = styled.p`
  margin-bottom: 1rem;
`;

const PetAge = styled.p`
  font-weight: bold;
`;

const PetDescriptionInput = styled.input`
  width: 40%;
  height: 75px;
  padding: 1rem;
  border-radius: 1rem;
  border: 2px solid #ccc;
  margin-bottom: 1rem;
`;


const PetProfile = () => {
    const [description, setDescription] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.");

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    return (
        <Container>
            <PetImage src="https://www.purina.ch/sites/default/files/2021-02/BREED%20Hero_0075_japanese_shiba_inu.jpg" alt="Pet Portrait" />
            <PetDescriptionInput value={description} onChange={handleDescriptionChange} placeholder="Enter pet description" />
            <PetAge>Age: 2 years old</PetAge>
        </Container>
    );
};

export default PetProfile;
