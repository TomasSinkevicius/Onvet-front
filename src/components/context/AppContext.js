import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie/es6";
import { parseJwt } from "../../utils/functions";

export const AppContext = React.createContext([{}, () => {}]);

export const AppProvider = (props) => {
  const [user, setUser] = useState(null);
  const cookies = new Cookies();

  useEffect(() => {
    let jwtToken = cookies.get("jwt");
    let userData = jwtToken ? parseJwt(jwtToken) : null;
    setUser(userData);
  }, []);

  return (
    <AppContext.Provider value={[user, setUser]}>
      {props.children}
    </AppContext.Provider>
  );
};
