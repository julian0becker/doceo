import React, { useContext } from "react";
import ContentDisplay from "../components/ContentDisplay";
import { AuthContext } from "../context/auth-context";
import Body from "../components/Body";
import Landingpage from "./Landingpage";
import { UserContext } from "../context/user-context";
import Friends from "./Friends";
import Overview from "./Overview";
import Requests from "./Requests";

function Home() {
  const { user } = useContext(AuthContext);
  const { page } = useContext(UserContext);

  let Component;
  switch (page) {
    case "home":
      Component = Overview;
      break;
    case "friends":
      Component = Friends;
      break;
    case "requests":
      Component = Requests;
      break;
    default:
      Component = ContentDisplay;
      break;
  }

  return (
    <React.Fragment>
      {user ? <Body content={Component} /> : <Landingpage />}
    </React.Fragment>
  );
}

export default Home;
