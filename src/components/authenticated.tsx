import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import { Pokemon, Stat } from "../interfaces/pokemon";

function getStatsText(stats: Stat[]) {
  return stats?.map((stat) => stat.base_stat).join(", ");
}

const Authenticated = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [isLoading, setLoading] = useState(false);
  const [isRandom, setRandom] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);

  const getRandomPokemon = async () => {
    setLoading(true);

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

    setRandom(true);
    setLoading(false);
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
              {pokemon?.sprites?.front_default && (
                <Grid item xs={6}>
                  <Avatar
                    sx={{ width: 150, height: 150 }}
                    alt={pokemon.name}
                    src={pokemon?.sprites?.front_default}
                  />
                </Grid>
              )}
              {pokemon?.sprites?.back_default && (
                <Grid item xs={6}>
                  <Avatar
                    sx={{ width: 150, height: 150 }}
                    alt={pokemon.name}
                    src={pokemon?.sprites?.back_default}
                  />
                </Grid>
              )}
            </Grid>
            <Typography align="center" variant="body2" color="text.secondary">
              Front and Back Image
            </Typography>
            <List dense={true}>
              <ListItem>
                <ListItemText
                  key="stats"
                  primary={`Stats: ${getStatsText(pokemon?.stats)}`}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}
      {isRandom && (!pokemon || !Object.keys(pokemon).length) && (
        <Alert severity="error">Pokemon is not found!</Alert>
      )}
      <LoadingButton
        onClick={getRandomPokemon}
        endIcon={<SendIcon />}
        loading={isLoading}
        loadingPosition="end"
        variant="contained"
      >
        Fetch random Pokemon
      </LoadingButton>
      <LogoutButton />
    </React.Fragment>
  ) : (
    <LoginButton />
  );
};

export default Authenticated;
