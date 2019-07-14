import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth-context";
import gql from "graphql-tag";
import { Segment, Card, Flag, Button } from "semantic-ui-react";
import moment from "moment";

export default function Request(props) {
  const requestIdContext = props.match.params.id;
  const { user } = useContext(AuthContext);
  const client = useApolloClient();

  const data = client.readQuery({
    query: FETCH_REQUESTS_QUERY,
    variables: { name: user.id }
  });

  const request = data.getRequests.filter(req => req.id === requestIdContext);

  return (
    <div>
      <Link to="/">
        <Button secondary>Back</Button>
      </Link>
      <Segment style={{ display: "flex", minHeight: "200px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <Card>
              <Card.Content>
                <Card.Header>
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <span>{request[0].subject}</span>
                    <Flag className="request-flag" name={request[0].language} />
                  </span>
                </Card.Header>
                <Card.Meta>{moment(request[0].createdAt).fromNow()}</Card.Meta>
                <Card.Description>
                  <p>from {request[0].username}</p>
                  <p>{request[0].description}</p>
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
        </div>
        <div style={{ width: "100%", paddingLeft: "15px" }}>
          <div style={{ textAlign: "center" }}>
            <h2>Create Exercise</h2>
          </div>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around"
            }}
          >
            <div>
              <Card>
                <Card.Content>
                  <Card.Header>Translation</Card.Header>
                  <Card.Description>
                    Click here to enter translations
                  </Card.Description>
                </Card.Content>
              </Card>
            </div>
            <div>
              <Card>
                <Card.Content>
                  <Card.Header>Dialogue</Card.Header>
                  <Card.Description>
                    Click here to enter a dialogue
                  </Card.Description>
                </Card.Content>
              </Card>
            </div>
          </div>
        </div>
      </Segment>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button secondary>Close Request</Button>
      </div>
    </div>
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
