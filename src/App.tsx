import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import CssBaseline from "@mui/material/CssBaseline";
import { SxProps } from "@mui/system";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";

import Loading from "./components/loading";
import Authenticated from "./components/authenticated";

import "./App.css";

const App = () => {
  const { isLoading } = useAuth0();

  const cardStyle = {
    maxWidth: 500,
    minHeight: 500,
    overflowY: 'auto',
    display: "flex",
    flexDirection: 'column',
    justifyContent: "space-around",
    alignItems: "center",
    position: "relative",
  } as SxProps;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Card sx={cardStyle}>
          {isLoading ? <Loading /> : <Authenticated />}
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default App;
