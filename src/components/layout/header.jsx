import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import styled from "styled-components";
import { parseJwt } from "../../utils/functions";
import { ReactComponent as DogSvg } from "../../images/dog.svg";
import { Burger } from "../burger/Burger";
import { Menu } from "../menu";
import { mediaQuery } from "../../theme/breakpoints";

const HeaderContainer = styled.div`
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.9);
  position: absolute;
  top: 0;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);

  a {
    margin-right: 16px;
    color: white;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      cursor: pointer;
      color: #f4e140;
      opacity: 0.7;
    }
  }
`;

const HeaderLeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  z-index: 3;
  span {
    color: #f4e140;
    font-family: "Marcellus SC", serif;
  }
  svg {
    width: 50px;
    height: 50px;
  }

  &:hover {
    cursor: pointer;
    color: #f4e140;
    opacity: 0.7;
  }
`;
const LeftSideLinks = styled.div`
  ${mediaQuery("sm")} {
    display: none;
  }
`;

export const Header = () => {
  const [open, setOpen] = useState(false);
  const cookies = new Cookies();
  let jwtToken = cookies.get("jwt") ? cookies.get("jwt") : null;
  const userData = jwtToken ? parseJwt(jwtToken) : null;

  return (
    <HeaderContainer>
      <HeaderLeftSide>
        <Logo
          to="/"
          onClick={() => {
            setOpen(false);
          }}
        >
          <DogSvg />
          <span>OnVet</span>
        </Logo>
        <LeftSideLinks>
          <Link to="/">Namai</Link>
          {userData ? (
            <Link to="/mano-paskyra">Sveiki, {userData.username}!</Link>
          ) : (
            <Link to="/mano-paskyra">Prisijungti</Link>
          )}
        </LeftSideLinks>
        <Menu setOpen={setOpen} open={open} jwtToken={jwtToken} />
      </HeaderLeftSide>
      <Burger open={open} setOpen={setOpen} />
    </HeaderContainer>
  );
};
