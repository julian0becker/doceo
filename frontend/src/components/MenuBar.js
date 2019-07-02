import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { UserContext } from "../context/user-context";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const activeName = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(activeName);
  const { setLanguages, setPage } = useContext(UserContext);

  const handleItemClick = (e, { name }) => setActiveItem(name);
  const handleLogout = () => {
    logout();
    setActiveItem("home");
    setLanguages(null);
    setPage("home");
  };

  const menubar = user ? (
    <Menu pointing secondary size="massive" color="black">
      <Menu.Item name={user.username} active as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={handleLogout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="black">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          className="register-button"
          name="register"
          content="Register / Login"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menubar;
}

export default MenuBar;
