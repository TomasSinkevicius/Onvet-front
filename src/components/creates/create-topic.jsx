import React, { useEffect, useState } from "react";
import { Input } from "../input";
import axios from "axios";
import { create } from "../../utils/functions";
import { ReactComponent as ArrowSvg } from "../../images/arrow.svg";
import { ReactComponent as CatSvg } from "../../images/cat.svg";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    padding: 12px 30px;
    background: #4a74eb;
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
      font-size: 16px;
      line-height: 22px;
      color: white;
      width: max-content;
    }

    &:hover {
      opacity: 0.8;
      svg {
        transform: rotate(20deg);
      }
    }
  }

  input {
    padding: 4px;
    border: none;
    border: 1px solid #4a74eb;
    width: 208px;
    margin: 16px 0;
    font-size: 16px;

    &:focus {
      outline: 2px solid #4a74eb;
    }
  }
`;

const Container = styled.div`
  position: fixed;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  color: #000;
  text-align: center;
  border-radius: 20px;
  padding: 30px 30px 30px;
  box-shadow: 0 0 15px black;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CatImage = styled.div`
  svg {
    width: 80px !important;
  }
`;

const CloseButton = styled.button`
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
`;

export const CreateTopic = ({ jwt, setCreateActive }) => {
  const [topicDetails, setTopicDetails] = useState({
    title: "",
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const onFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let formData = new FormData();
    formData.append("title", topicDetails.title);

    create(formData, 0, jwt);
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setTopicDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <Container>
      <CloseButton onClick={() => setCreateActive(false)}>✘</CloseButton>
      <CatImage>
        <CatSvg />
      </CatImage>
      <h3>Sukurti kategoriją</h3>
      <Form onSubmit={onFormSubmit}>
        <input
          name="title"
          placeholder="pavadinimas"
          onChange={handleOnChange}
        />
        <button type="submit">
          <span>Sukurti</span> <ArrowSvg />
        </button>
      </Form>
    </Container>
  );
};
