import React, { useState, useContext } from "react";
import { UserContext } from "../context/user-context";
import { Menu, Image, Dropdown, Input } from "semantic-ui-react";

function Dashboard() {
  const { page, setPage } = useContext(UserContext);
  const [activeItem, setActiveItem] = useState(page);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    setPage(name);
  };

  return (
    <Menu vertical>
      <Menu.Item>
        <Image
          src="https://react.semantic-ui.com/images/avatar/large/chris.jpg"
          size="small"
          circular
          centered
        />
      </Menu.Item>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
      >
        Home
      </Menu.Item>

      <Menu.Item
        name="friends"
        active={activeItem === "friends"}
        onClick={handleItemClick}
      >
        Friends
      </Menu.Item>
      <Menu.Item
        name="requests"
        active={activeItem === "requests"}
        onClick={handleItemClick}
      >
        Requests
      </Menu.Item>
      <Menu.Item
        name="exercises"
        active={activeItem === "exercises"}
        onClick={handleItemClick}
      >
        Exercises
      </Menu.Item>

      <Dropdown item text="More">
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={handleItemClick}
            name="edit"
            icon="edit"
            text="Edit Profile"
          />
          <Dropdown.Item icon="globe" text="Choose Language" />
          <Dropdown.Item icon="settings" text="Account Settings" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
}

export default Dashboard;
