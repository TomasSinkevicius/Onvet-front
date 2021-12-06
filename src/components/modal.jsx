import React from "react";
import styled from "styled-components";
import { ReactComponent as DogSvg } from "../images/blue-dog.svg";

const ModalContainer = styled.div`
  position: absolute;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  color: #000;
  text-align: center;
  border-radius: 20px;
  padding: 30px 30px 70px;
  box-shadow: 0 0 15px black;
  z-index: 1;

  svg {
    width: 80px;
    margin-bottom: 20px;
  }

  button {
    position: absolute;
    right: 15px;
    top: 15px;
    border: none;
    background: transparent;
    font-weight: 500;
    font-size: 25px;
    cursor: pointer;

    &:hover {
      color: #ff714b;
    }
  }
`;

export const Modal = ({ setModalVisible }) => {
  return (
    <ModalContainer>
      <button onClick={() => setModalVisible(false)}>✘</button>
      <DogSvg />
      Mes esame internetinė klausimų apie gyvūnus sveitanė, kurioje atsakinėja
      ne tik paparasti žmonės, susidūrę su panašiomis problemos, tačiau ir
      administracijos patvirtinti veterinarai!
    </ModalContainer>
  );
};
