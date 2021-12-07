import React from "react";
import burger from "./burger.css";
import styled from "styled-components";

const BurgerContainer = styled.div``;

export const Burger = ({ setOpen, open }) => {
  const changeState = (e) => {
    open = !open;
    setOpen(!open);
  };
  return (
    <BurgerContainer onClick={changeState} className="burger">
      <label for="check">
        <input type="checkbox" id="check" />
        <span></span>
        <span></span>
        <span></span>
      </label>
    </BurgerContainer>
  );
};
