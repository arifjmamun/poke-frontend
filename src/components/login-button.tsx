import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Button from "@mui/material/Button";
import Login from "@mui/icons-material/Login";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant="contained"
      color="success"
      endIcon={<Login />}
      onClick={() => loginWithRedirect()}
    >
      Login
    </Button>
  );
};

export default LoginButton;
