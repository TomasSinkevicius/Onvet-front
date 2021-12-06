import React from "react";
import styled from "styled-components";
import { mediaQuery } from "../../theme/breakpoints";

const FooterContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
`;

const CopyrightText = styled.span`
  font-size: 14px;
  line-height: 21px;
  color: #ffffff;
  margin: 20px;

  ${mediaQuery("sm")} {
    font-size: 10px;
    line-height: 15px;
  }
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <CopyrightText>
        Autorius Tomas Sinkevičius &copy; {new Date().getFullYear()}
      </CopyrightText>
    </FooterContainer>
  );
};
