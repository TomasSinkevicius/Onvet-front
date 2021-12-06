import React, { useState } from "react";
import styled from "styled-components";
import dogImage from "../images/dog-heart.png";
import { ReactComponent as ArrowSvg } from "../images/arrow.svg";
import { Modal } from "./modal";

const HeroContainer = styled.section`
  width: 100%;
  background: #f4e140;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 50px 0;

  img {
    max-width: 100%;
    height: auto;
  }

  h1 {
    color: #ff714b;
    font-size: 27px;
    font-weight: 700;
  }
`;

const Button = styled.div`
  padding: 15px 40px;
  background: #ff714b;
  border-radius: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    margin-left: 20px;
    transition: transform 0.2s ease;
  }

  span {
    font-size: 18px;
    line-height: 22px;
    color: white;
  }

  &:hover {
    opacity: 0.8;
    svg {
      transform: rotate(20deg);
    }
  }
`;

export const Hero = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <HeroContainer>
      {modalVisible && <Modal setModalVisible={setModalVisible} />}
      <img src={dogImage} />

      {/* <h1>Internetinė gynūnų problemų sveitainė!</h1> */}
      <Button onClick={() => setModalVisible(true)}>
        <span>Apie mus</span> <ArrowSvg />
      </Button>
    </HeroContainer>
  );
};
