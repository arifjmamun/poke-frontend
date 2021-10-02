import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { Pokemon } from "../interfaces/pokemon";

const PokemonResult = () => {
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently } = useAuth0();

  const getRandomPokemon = async () => {
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

  useEffect(() => {
    getRandomPokemon();
  }, []);

  return pokemon && Object.keys(pokemon).length ? (
    <Card>
      <CardHeader
        avatar={<Avatar alt="Remy Sharp" src={pokemon?.sprites?.back_default!} />}
        title={pokemon?.name}
        subheader={`Height: ${pokemon?.height}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
  ) : (
    <Alert severity="error">Pokemon is not found!</Alert>
  );
};

export default PokemonResult;
