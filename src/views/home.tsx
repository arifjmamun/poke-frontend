import React from "react";

import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { user } = useAuth0();

  return (
    <div>
      <div className="row align-items-center profile-header">
        Home
      </div>
    </div>
  );
};

export default Home;