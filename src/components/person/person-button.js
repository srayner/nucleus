import React from "react";
import styled from "styled-components";
import { fullName } from "../../library/person";

const Container = styled.button`
  border-radius: 3px;
  border: 1px solid #a9a9a9;
  background: white;
  color: black;
  font-size: 16px;
  font-weight: 600;
  padding: 5px;
  width: ${props => {
    return props.child ? "220px" : "240px";
  }};
  margin: 5px;
  margin-left: ${props => {
    return props.child ? "25px" : "5px";
  }};
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 0 0 3px #5e6770;
  }
  &:focus {
    outline: none;
  }
`;

const Span = styled.span`
  margin-left: 5px;
`;

const PersonButton = props => {
  const { person } = props;
  const gender = person.gender === "male" ? "male" : "female";
  const imgSrc = "/" + gender + ".png";
  const name = fullName(person);
  return (
    <Container child={props.child}>
      <img src={imgSrc} height="32" alt={gender} />
      <Span>{name}</Span>
    </Container>
  );
};

export default PersonButton;
