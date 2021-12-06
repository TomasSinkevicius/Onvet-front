import React, { useEffect, useState } from "react";
import { Container } from "../theme/helpers";
import axios from "axios";
import { parseJwt } from "../utils/functions";

export const Dashboard = ({ setIsLoggedIn, cookies }) => {
  let jwtToken = cookies.get("jwt");
  const userData = jwtToken ? parseJwt(jwtToken) : null;
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
        // window.location = "/";
        // cookies.remove("jwt");
      });
  };

  return (
    <Container>
      {userData && (
        <>
          <h3>Sveiki, {userData.username}</h3>
          {userData.role === "1" ? <h4>Administratorius</h4> : <h4>Svecias</h4>}
        </>
      )}
      <button onClick={logout}>Logout</button>
    </Container>
  );
};
