import React, { useEffect, useState } from "react";
import { Input } from "../input";
import axios from "axios";
import { create } from "../../utils/functions";
import styled from "styled-components";

const InputContainer = styled.textarea`
  width: 350px;
  height: 150px;
  border: 2px solid #c2c3c7;
  display: flex;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 8px;
`;

const Button = styled.button`
  background: #4a74eb;
  border: 1px solid #4a74eb;
  padding: 10px 20px;
  color: white;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export const CreateComment = ({ postId, jwt }) => {
  const [commentDetails, setCommentDetails] = useState({
    comment_text: "",
    post_id: postId,
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const onFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let formData = new FormData();
    formData.append("comment_text", commentDetails.comment_text);
    formData.append("post_id", commentDetails.post_id);

    create(formData, 2, jwt);
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setCommentDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <div>
      <div>
        <form onSubmit={onFormSubmit}>
          <InputContainer
            name="comment_text"
            type="text"
            placeholder="Palik komentarą!"
            onChange={handleOnChange}
          />

          <Button type="submit">Paskelbti</Button>
        </form>
      </div>
    </div>
  );
};
