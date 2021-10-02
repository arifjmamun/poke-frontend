import { useAuth0 } from "@auth0/auth0-react";

import Fab from "@mui/material/Fab";
import Logout from "@mui/icons-material/Logout";
import { SxProps } from "@mui/system";

const PokemonResult = () => {
  const { logout } = useAuth0();

  const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 16,
  } as SxProps;

  return (
    <Fab
      size="small"
      color="secondary"
      aria-label="logout"
      sx={fabStyle}
      onClick={() => logout()}
    >
      <Logout />
    </Fab>
  );
};

export default PokemonResult;
