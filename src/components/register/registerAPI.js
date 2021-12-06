import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";

export const RegisterAPI = (props) => {
  const registerUrl = "https://onvet.herokuapp.com/api/auth/register";
  const loginUrl = "https://onvet.herokuapp.com/api/auth/login";
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (props.APIDetailsSignUp.name.length > 0) {
      let registerFormData = new FormData();

      registerFormData.append("name", props.APIDetailsSignUp.name);
      registerFormData.append("email", props.APIDetailsSignUp.email);
      registerFormData.append("password", props.APIDetailsSignUp.password);
      registerFormData.append(
        "password_confirmation",
        props.APIDetailsSignUp.password_confirmation
      );

      fetch(registerUrl, {
        method: "POST",
        body: registerFormData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data["message"]) {
            setIsRegistered(true);
          } else {
            props.setLoading(false);
            props.setServerMessage("Toks email jau uzimtas");
          }
        });
    }
  }, [props.APIDetailsSignUp]);

  useEffect(() => {
    const cookies = new Cookies();
    let loginFormData = new FormData();
    loginFormData.append("email", props.APIDetailsSignUp.email);
    loginFormData.append("password", props.APIDetailsSignUp.password);

    if (isRegistered) {
      fetch(loginUrl, {
        method: "POST",
        body: loginFormData,
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
  }, [isRegistered]);
  return <></>;
};
