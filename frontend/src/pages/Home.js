import React, { useContext } from "react";
import ContentDisplay from "../components/ContentDisplay";
import { AuthContext } from "../context/auth-context";
import Body from "../components/Body";
import Landingpage from "./Landingpage";
import { UserContext } from "../context/user-context";
import Friends from "./Friends";

function Home() {
  const { user } = useContext(AuthContext);
  const { page } = useContext(UserContext);

  let Component;
  page === "exercises" ? (Component = ContentDisplay) : (Component = Friends);

  return (
    <React.Fragment>
      {user ? <Body content={Component} /> : <Landingpage />}
    </React.Fragment>
  );
}

export default Home;
