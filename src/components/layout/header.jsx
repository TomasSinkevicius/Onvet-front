import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import styled from "styled-components";
import { parseJwt } from "../../utils/functions";
import { ReactComponent as DogSvg } from "../../images/dog.svg";

const HeaderContainer = styled.div`
  height: 80px;

  display: flex;
  align-items: center;
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

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  span {
    color: #f4e140;
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

export const Header = () => {
  const cookies = new Cookies();
  let jwtToken = cookies.get("jwt") ? cookies.get("jwt") : null;
  const userData = jwtToken ? parseJwt(jwtToken) : null;

  return (
    <HeaderContainer>
      <Logo to="/">
        <DogSvg />
        <span>OnVet</span>
      </Logo>
      <Link to="/">Namai</Link>
      {userData ? (
        <Link to="/mano-paskyra">Sveiki, {userData.username}!</Link>
      ) : (
        <Link to="/mano-paskyra">Prisijungti</Link>
      )}
    </HeaderContainer>
  );
};
