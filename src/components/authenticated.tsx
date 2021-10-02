import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Button from "@mui/material/Button";

import LoginButton from "./login-button";
import LogoutButton from "./logout-button";

const Authenticated = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <React.Fragment>
      <Button variant="contained">Fetch random Pokemon</Button>
      <LogoutButton />
    </React.Fragment>
  ) : (
    <LoginButton />
  );
};

export default Authenticated;
