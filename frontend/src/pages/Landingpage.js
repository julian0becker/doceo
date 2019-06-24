import React from "react";
import { Step, Icon, Header } from "semantic-ui-react";

function Landingpage() {
  return (
    <div className="intro">
      <Header as="h1" textAlign="center">
        Graduation Project
      </Header>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.
      </p>
      <Step.Group widths={3}>
        <Step>
          <Icon name="users" />
          <Step.Content>
            <Step.Title>Connect</Step.Title>
            <Step.Description>Connect with your Friends</Step.Description>
          </Step.Content>
        </Step>
        <Step>
          <Icon name="envelope outline" />
          <Step.Content>
            <Step.Title>Request</Step.Title>
            <Step.Description>Ask your Friend a Question</Step.Description>
          </Step.Content>
        </Step>
        <Step>
          <Icon name="book" />
          <Step.Content>
            <Step.Title>Learn</Step.Title>
            <Step.Description>
              Get Input and Help from a Friend
            </Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
    </div>
  );
}

export default Landingpage;
