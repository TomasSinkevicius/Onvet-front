import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Layout } from "./layout";
import { Login } from "./login/login";
import { Register } from "./register/register";
import { Container } from "./../theme/helpers";
import Cookies from "universal-cookie/es6";
import { parseJwt } from "../utils/functions";
import { Dashboard } from "./dashboard";
import { mediaQuery } from "../theme/breakpoints";

const TopButtons = styled.div`
  display: flex;
`;
const Text = styled.a`
  color: ${({ isLogin }) => (isLogin ? "#4A74EB;" : "#bbbbbb")};
  font-size: 30px;
  font-weight: 500;
  padding: 0 11px;
  cursor: pointer;

  &:nth-child(2) {
    color: ${({ isLogin }) => (isLogin ? "#bbbbbb" : "#4A74EB;")};
  }
  &:hover {
    color: #4a74eb;
  }

  ${mediaQuery("sm")} {
    font-size: 20px;
  }
`;
const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.83);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
`;
const ErrorContainer = styled.div`
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #f7f6f7;
  border-top: 3px solid #b81c23;
  margin-bottom: 20px;
`;

export const MyAccount = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [serverMessage, setServerMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookies = new Cookies();

  return (
    <Layout>
      {isLoggedIn || cookies.get("jwt") ? (
        <Dashboard setIsLoggedIn={setIsLoggedIn} cookies={cookies} />
      ) : (
        <FormContainer>
          {serverMessage !== "" && (
            <Container>
              <ErrorContainer>
                <p>{serverMessage}</p>
              </ErrorContainer>
            </Container>
          )}
          <TopButtons>
            <Text isLogin={isLogin} onClick={() => setIsLogin(true)}>
              Prisijungti
            </Text>
            <Text isLogin={isLogin} onClick={() => setIsLogin(false)}>
              Registruotis
            </Text>
          </TopButtons>
          {isLogin ? (
            <Login
              setServerMessage={setServerMessage}
              setIsLoggedIn={setIsLoggedIn}
            />
          ) : (
            <Register
              setServerMessage={setServerMessage}
              setIsLoggedIn={setIsLoggedIn}
            />
          )}
        </FormContainer>
      )}
    </Layout>
  );
};
