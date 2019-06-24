import React from "react";
import { Segment, Icon } from "semantic-ui-react";

function Footer() {
  return (
    <footer>
      <Segment>
        <Icon name="github" />
        <a
          href="https://github.com/julian0becker"
          target="_blank"
          rel="noopener noreferrer"
        >
          julian0becker
        </a>
      </Segment>
    </footer>
  );
}

export default Footer;
