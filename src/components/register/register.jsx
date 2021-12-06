import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input } from "../input";
import cartSpinnerGif from "../../images/cart-spinner.gif";
import { RegisterAPI } from "./registerAPI";
import { validateAndSanitizeRegisterForm } from "../../validator/register";
import { Container } from "../../theme/helpers";
import { mediaQuery } from "../../theme/breakpoints";

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

const Text = styled.p`
  color: black;
  padding: 8px 0;
  cursor: pointer;

  ${mediaQuery("lg")} {
    font-size: 14px;
  }
`;

const Checkbox = styled.input`
  width: 17px;
  height: 17px;
  margin-right: 8px;
  cursor: pointer;
`;
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
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

export const Register = (props) => {
  const [terms, setTerms] = useState(false);
  const [APIDetailsSignUp, setAPIDetailsSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUpDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);

  /**
   * Sets client side error.
   *
   * Sets error data to result of our client side validation,
   * and statusbars to true so that its visible.
   *
   * @param {Object} validationResult Validation result data.
   */
  const setClientSideError = (validationResult) => {
    if (validationResult.errors.password_confirmation) {
      props.setServerMessage(validationResult.errors.password_confirmation);
    }

    if (validationResult.errors.password) {
      props.setServerMessage(validationResult.errors.password);
    }

    if (validationResult.errors.email) {
      props.setServerMessage(validationResult.errors.email);
    }

    if (validationResult.errors.name) {
      props.setServerMessage(validationResult.errors.name);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setSignUpDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const validationResult = validateAndSanitizeRegisterForm({
      name: signUpDetails.name,
      email: signUpDetails.email,
      password: signUpDetails.password,
      password_confirmation: signUpDetails.password_confirmation,
      terms: terms,
    });

    // If the data is valid.
    if (validationResult.isValid) {
      setSignUpDetails({
        name: validationResult.sanitizedData.name,
        email: validationResult.sanitizedData.email,
        password: validationResult.sanitizedData.password,
        password_confirmation:
          validationResult.sanitizedData.password_confirmation,
      });

      setAPIDetailsSignUp({ ...signUpDetails });
    } else {
      setLoading(false);
      setClientSideError(validationResult);
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={onFormSubmit}>
        <Text>
          Įveskite vartotojo vardą arba elektroninio pašto adresą ir slaptažodį.
        </Text>

        <Input
          type="text"
          placeholder="Vartotojo vardas"
          name="name"
          value={signUpDetails.name}
          onChange={handleOnChange}
        />
        <Input
          type="email"
          placeholder="El.paštas"
          name="email"
          value={signUpDetails.email}
          onChange={handleOnChange}
        />
        <Input
          type="password"
          placeholder="Slaptažodis"
          name="password"
          value={signUpDetails.password}
          onChange={handleOnChange}
        />
        <Input
          placeholder="Patvirtinti slaptažodį"
          type="password"
          name="password_confirmation"
          value={signUpDetails.password_confirmation}
          onChange={handleOnChange}
        />
        {loading && (
          <img
            className="woo-next-cart-item-spinner"
            src={cartSpinnerGif}
            alt="loading"
          />
        )}

        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            onChange={(e) => setTerms(e.target.checked)}
          />
          <Text>Sutinku su privatumo politika</Text>
        </CheckboxContainer>

        <FormButton type="submit">REGISTRUOTIS</FormButton>
        <RegisterAPI
          APIDetailsSignUp={APIDetailsSignUp}
          setUsername={props.setUsername}
          setIsLoggedIn={props.setIsLoggedIn}
          setServerMessage={props.setServerMessage}
          setLoading={setLoading}
        />
      </FormContainer>
    </Container>
  );
};
