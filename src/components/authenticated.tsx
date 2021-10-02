import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import { Pokemon } from "../interfaces/pokemon";

const Authenticated = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [isRandom, setRandom] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);

  const getRandomPokemon = async () => {
    setRandom(true);

    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${serverUrl}/pokemon/random`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const responseData = await response.json();

      setPokemon(responseData);
    } catch (error) {
      setPokemon({} as Pokemon);
    }
  };

  return isAuthenticated ? (
    <React.Fragment>
      {isRandom && pokemon && Object.keys(pokemon).length && (
        <Card sx={{ minWidth: 300 }}>
          <CardHeader
            title={`Name: ${pokemon?.name}`}
            subheader={`Height: ${pokemon?.height}`}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Avatar
                  sx={{ width: 150, height: 150 }}
                  alt={pokemon.name}
                  src={pokemon?.sprites?.front_default!}
                />
              </Grid>
              <Grid item xs={6}>
                <Avatar
                  sx={{ width: 150, height: 150 }}
                  alt={pokemon.name}
                  src={pokemon?.sprites?.back_default!}
                />
              </Grid>
            </Grid>
            <Typography align="center" variant="body2" color="text.secondary">Front and Back Image</Typography>
          </CardContent>
        </Card>
      )}
      {isRandom && (!pokemon || !Object.keys(pokemon).length) && (
        <Alert severity="error">Pokemon is not found!</Alert>
      )}
      <Button variant="contained" onClick={getRandomPokemon}>
        Fetch random Pokemon
      </Button>
      <LogoutButton />
    </React.Fragment>
  ) : (
    <LoginButton />
  );
};

export default Authenticated;
