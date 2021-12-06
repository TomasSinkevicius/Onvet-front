import React from "react";
import styled from "styled-components";
const EditContainer = styled.div`
  width: 100%;
`;
const Title = styled.input`
  border: none;
  font-size: 1em;
  margin-top: 1.33em;
  font-weight: bold;
  font-style: italic;
`;
const Content = styled.textarea`
  border: none;
  font-size: 16px;
  margin: 16px 0;
  font-style: italic;
  height: 100px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EditPost = ({
  title,
  content,
  editClicked,
  index,
  setEditedData,
}) => {
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <EditContainer>
      {editClicked.value && editClicked.index === index ? (
        <InputContainer>
          <Title name="title" defaultValue={title} onChange={handleOnChange} />
          <Content
            name="content"
            defaultValue={content}
            onChange={handleOnChange}
          />
        </InputContainer>
      ) : (
        <div>
          <h4>{title}</h4>
          <p>{content}</p>
        </div>
      )}
    </EditContainer>
  );
};
