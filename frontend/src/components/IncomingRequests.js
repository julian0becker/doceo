import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth-context";
import gql from "graphql-tag";
import { Grid, Card, Flag } from "semantic-ui-react";
import LoadingBlock from "./LoadingBlock";
import moment from "moment";
import { Link } from "react-router-dom";

export default function IncomingRequests() {
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_REQUESTS_QUERY, {
    variables: { name: user.id, isRequestClosed: false },
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
                  <Link to={`/request/${request.id}`}>
                    <Card fluid style={{ marginBottom: "5px" }}>
                      <Card.Content>
                        <Card.Header>
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "space-between"
                            }}
                          >
                            <span>{request.subject}</span>
                            <Flag
                              className="request-flag"
                              name={request.language}
                            />
                          </span>
                        </Card.Header>

                        <Card.Meta>
                          {moment(request.createdAt).fromNow()}
                        </Card.Meta>
                        <Card.Description>
                          from {request.username}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </Link>
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
  query($name: ID!, $isRequestClosed: Boolean!) {
    getRequests(recipientId: $name, isRequestClosed: $isRequestClosed) {
      id
      username
      language
      subject
      createdAt
      description
    }
  }
`;
