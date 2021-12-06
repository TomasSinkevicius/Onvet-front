import React from "react";
import styled, { css } from "styled-components";

const InputContainer = styled.div`
  line-height: 1;
  display: flex;
  align-items: center;
  background-color: white;
  box-sizing: border-box;
  border: 1px solid #ddd;
  padding: 0 15px;
  margin-bottom: 16px;

  ${({ error }) =>
    error &&
    css`
      border: 1px solid red;
    `}
`;

const InputStyled = styled.input`
  border: none;
  background-color: transparent;
  height: 44px;
  outline: none;
  line-height: 1;
  color: gray;
  width: 100%;
  font-size: 16px;
  color: black;

  &::placeholder {
    color: gray;
  }
`;

export const Input = ({
  placeholder,
  type = "text",
  name,
  error,
  ...restProps
}) => {
  return (
    <>
      <InputContainer error={error}>
        <InputStyled
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          {...restProps}
        />
      </InputContainer>
    </>
  );
};
