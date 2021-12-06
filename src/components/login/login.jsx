import React, { useState } from "react";
import { Input } from "../input";
import styled from "styled-components";
import { mediaQuery } from "../../theme/breakpoints";
import cartSpinnerGif from "../../images/cart-spinner.gif";
import { Container } from "../../theme/helpers";
import { validateAndSanitizeLoginForm } from "../../validator/login";
import { LoginAPI } from "./loginAPI";

const Text = styled.a`
  color: black;
  padding: 8px 0;
  cursor: pointer;
  text-decoration: none;

  ${mediaQuery("lg")} {
    font-size: 14px;
  }
`;
const FormContainer = styled.form`
  width: 570px;
  border: 1px solid #d3ced2;
  color: black;
  background: "#f5f5f5";
  padding: 40px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 32px auto;

  img {
    width: 50px;
  }

  ${mediaQuery("lg")} {
    width: 100%;
    max-width: 570px;
    padding: 0;
    border: none;
  }
`;
const FormButton = styled.button`
  width: 100%;
  text-align: center;
  color: white;
  padding: 16px;
  background: black;
  border: none;
  margin-top: 8px;
  cursor: pointer;
`;

export const Login = ({ setServerMessage, setIsLoggedIn, setJwtToken }) => {
  const [APIDetailsLogin, setAPIDetailsLogin] = useState({
    email: "",
    password: "",
  });
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const setClientSideError = (validationResult) => {
    if (validationResult.errors.password) {
      setServerMessage(validationResult.errors.password);
    }

    if (validationResult.errors.email) {
      setServerMessage(validationResult.errors.email);
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const onFormSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    const validationResult = validateAndSanitizeLoginForm({
      email: loginDetails.email,
      password: loginDetails.password,
    });

    if (validationResult.isValid) {
      setLoginDetails({
        email: validationResult.sanitizedData.email,
        password: validationResult.sanitizedData.password,
      });
      setAPIDetailsLogin({ ...loginDetails });
    } else {
      setLoading(false);
      setClientSideError(validationResult);
    }
  };

  const [loading, setLoading] = useState(false);
  return (
    <Container>
      <FormContainer onSubmit={onFormSubmit}>
        <Text>Įveskite vartotojo vardą ir slaptažodį.</Text>

        <Input
          type="text"
          placeholder="Vartotojo vardas"
          name="email"
          value={loginDetails.email}
          onChange={handleOnChange}
        />
        <Input
          type="password"
          placeholder="Slaptazodis"
          name="password"
          value={loginDetails.password}
          onChange={handleOnChange}
        />
        {loading && <img src={cartSpinnerGif} alt="loading" />}
        <FormButton type="submit">PRISIJUNGTI</FormButton>
        <LoginAPI
          APIDetailsLogin={APIDetailsLogin}
          setServerMessage={setServerMessage}
          setLoading={setLoading}
          setIsLoggedIn={setIsLoggedIn}
          setJwtToken={setJwtToken}
        />
      </FormContainer>
    </Container>
  );
};
