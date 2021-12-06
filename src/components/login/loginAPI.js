import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseJwt } from "../../utils/functions";
import Cookies from "universal-cookie/es6";

export const LoginAPI = (props) => {
  const cookies = new Cookies();
  const url = "https://onvet.herokuapp.com/api/auth/login";
  useEffect(() => {
    if (props.APIDetailsLogin.email.length > 0) {
      let formData = new FormData();

      formData.append("email", props.APIDetailsLogin.email);
      formData.append("password", props.APIDetailsLogin.password);

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data["access_token"]) {
            let d = new Date();
            d.setMinutes(d.getMinutes() + data["expires_in"] / 60);
            cookies.set("jwt", data["access_token"], {
              path: "/",
              expires: d,
            });
            props.setLoading(false);
            props.setIsLoggedIn(true);
          } else {
            props.setLoading(false);
            props.setServerMessage(data["error"]);
          }
        });
    }
  }, [props.APIDetailsLogin]);

  return null;
};
