import React from "react";
import styled from "styled-components";

const Input = styled.input`
  display: block;
  font-size: 1em;
  margin-top: 1.33em;
  margin-bottom: 1.33em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
  border: none;
  font-style: italic;
`;

export const EditComment = ({
  comment_text,
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
    <div>
      {editClicked.value && editClicked.index === index ? (
        <Input
          name="comment_text"
          defaultValue={comment_text}
          onChange={handleOnChange}
        />
      ) : (
        <h4>{comment_text}</h4>
      )}
    </div>
  );
};
