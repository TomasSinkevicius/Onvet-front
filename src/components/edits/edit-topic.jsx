import React from "react";
import styled from "styled-components";

const Input = styled.input`
  font-size: 18px;
  line-height: 30px;
  color: #18191f;
  border: none;
  font-style: italic;
  width: 90%;

  border: 2px solid red;
  border-radius: 4px;
`;

export const EditTopic = ({ title, editClicked, index, setEditedData }) => {
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <div>
      {editClicked.value && editClicked.index === index ? (
        <Input name="title" defaultValue={title} onChange={handleOnChange} />
      ) : (
        <span>{title}</span>
      )}
    </div>
  );
};
