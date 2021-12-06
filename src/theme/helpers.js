import styled from "styled-components";
import { mediaQuery } from "../theme/breakpoints";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1300px;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;

  ${mediaQuery("xl")} {
    padding: 0 40px;
  }

  ${mediaQuery("md")} {
    padding: 0 32px;
  }

  ${mediaQuery("sm")} {
    padding: 0 16px;
  }
`;
