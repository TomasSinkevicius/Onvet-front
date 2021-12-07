import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Cookies from "universal-cookie/es6";

export const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  background: black;
  backdrop-filter: blur(11px);
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open, isScrolled }) =>
    open && !isScrolled ? "translateX(0)" : "translateX(-100%)"};
  z-index: 1;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 300px 0;

  a {
    font-size: 20px;
    line-height: 96.69%;
    color: #f4e140;
    transition: color 0.3s linear;
    cursor: pointer;
    margin-bottom: 10px;
    text-decoration: none;
    margin-bottom: 32px;
  }
`;

export const Menu = ({ open, setOpen, jwtToken }) => {
  const cookies = new Cookies();
  const config = {
    headers: { Authorization: `Bearer ${jwtToken}` },
  };
  const logoutApiUrl = "https://onvet.herokuapp.com/api/auth/logout";
  const logout = () => {
    axios
      .post(logoutApiUrl, "", config)
      .then((response) => {
        window.location = "/";
        cookies.remove("jwt");
      })
      .catch((error) => {
        console.log("err", error);
        window.location = "/";
        cookies.remove("jwt");
      });
  };

  return (
    <StyledMenu open={open}>
      <LinksContainer>
        <Link
          onClick={() => {
            setOpen(false);
          }}
          to="/"
        >
          Pagrindinis
        </Link>

        {jwtToken ? (
          <>
            <Link
              onClick={() => {
                setOpen(false);
              }}
              to="/mano-paskyra"
            >
              Mano paskyra
            </Link>
            <Link
              onClick={() => {
                setOpen(false);
                logout();
              }}
              to=""
            >
              Atsijungti
            </Link>
          </>
        ) : (
          <Link
            onClick={() => {
              setOpen(false);
            }}
            to="/mano-paskyra"
          >
            Prisijungti
          </Link>
        )}
      </LinksContainer>
    </StyledMenu>
  );
};
