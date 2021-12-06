import React from "react";
import { Header } from "./header";
import styled from "styled-components";
import { AppProvider } from "../context/AppContext";
import { Footer } from "./footer";
import { mediaQuery } from "../../theme/breakpoints";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;
const Content = styled.div`
  margin-top: 80px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Layout = ({ children }) => {
  return (
    <AppProvider>
      <Container>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Container>
    </AppProvider>
  );
};
