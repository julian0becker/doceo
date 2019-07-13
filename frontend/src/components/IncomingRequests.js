import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth-context";
import gql from "graphql-tag";
import { Grid, Card } from "semantic-ui-react";
import LoadingBlock from "./LoadingBlock";
import moment from "moment";
import { useApolloClient } from "@apollo/react-hooks";

export default function IncomingRequests() {
  const { user } = useContext(AuthContext);
  // const client = useApolloClient();

  // const { data } = client.query({
  //   query: FETCH_REQUESTS_QUERY,
  //   variables: { name: user.id }
  // });

  const { loading, data } = useQuery(FETCH_REQUESTS_QUERY, {
    variables: { name: user.id },
    fetchPolicy: "cache-and-network"
  });

  return (
    <React.Fragment>
      <h3>Newest Requests from your Friends</h3>
      <Grid columns={3}>
        <Grid.Row>
          {loading ? (
            <LoadingBlock />
          ) : (
            <React.Fragment>
              {data.getRequests.map(request => (
                <Grid.Column key={request.id}>
                  <Card fluid style={{ marginBottom: "5px" }}>
                    <Card.Content>
                      <Card.Header>{request.subject}</Card.Header>
                      <Card.Meta>
                        {moment(request.createdAt).fromNow()}
                      </Card.Meta>
                      <Card.Description>
                        from {request.username}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
            </React.Fragment>
          )}
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
}

const FETCH_REQUESTS_QUERY = gql`
  query($name: ID!) {
    getRequests(recipientId: $name) {
      id
      username
      language
      subject
      createdAt
      description
    }
  }
`;
