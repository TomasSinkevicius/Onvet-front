import React, { useEffect, useState } from "react";
import { Input } from "../input";
import axios from "axios";
import { create } from "../../utils/functions";
import { ReactComponent as CreateSvg } from "../../images/create.svg";
import styled from "styled-components";

const CreateButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;

  svg {
    width: 35px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  button {
    background: #4a74eb;
    border: 1px solid #4a74eb;
    padding: 10px 20px;
    color: white;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  input {
    border-radius: 8px;
    padding: 4px;
    border: 2px solid #c2c3c7;
    width: 208px;
  }

  textarea {
    width: 200px;
    margin: 16px 0;
    height: 100px;
    border-radius: 8px;
    padding: 8px;
    border: 2px solid #c2c3c7;
  }
`;

export const CreatePost = ({ topicId, jwt }) => {
  const [postDetails, setPostDetails] = useState({
    title: "",
    content: "",
    topic_id: topicId,
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const onFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let formData = new FormData();
    formData.append("title", postDetails.title);
    formData.append("content", postDetails.content);
    formData.append("topic_id", postDetails.topic_id);

    create(formData, 1, jwt);
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setPostDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <div>
      <CreateButton onClick={() => setVisible(!visible)}>
        <CreateSvg />
      </CreateButton>
      {visible && (
        <div>
          <Form onSubmit={onFormSubmit}>
            <input
              name="title"
              type="text"
              placeholder="pavadinimas"
              onChange={handleOnChange}
            />
            <textarea
              name="content"
              type="text"
              placeholder="Tekstas"
              onChange={handleOnChange}
            />
            <button type="submit">Sukurti</button>
          </Form>
        </div>
      )}
    </div>
  );
};
