import React from "react";
import { Grid } from "semantic-ui-react";
import Dashboard from "./Dashboard";

function Body(props) {
  const Component = props.content;
  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column width={4}>
          <Dashboard />
        </Grid.Column>
        <Grid.Column width={12}>
          <Component />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Body;
