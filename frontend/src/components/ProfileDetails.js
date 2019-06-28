import React from "react";
import { Table } from "semantic-ui-react";

import moment from "moment";

function ProfileDetails({ info }) {
  return (
    <React.Fragment>
      <Table stackable>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={6}>Username</Table.Cell>
            <Table.Cell>{info.username}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Email</Table.Cell>
            <Table.Cell>{info.email}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Joined</Table.Cell>
            <Table.Cell>{moment(info.createdAt).fromNow()}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Speaking</Table.Cell>
            <Table.Cell>
              <div style={{ display: "flex" }}>
                {info.languages.speaking.map(language => (
                  <span style={{ paddingRight: "15px" }}>{language}</span>
                ))}
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Speaking</Table.Cell>
            <Table.Cell>
              <div style={{ display: "flex" }}>
                {info.languages.learning.map(language => (
                  <span style={{ paddingRight: "15px" }}>{language}</span>
                ))}
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </React.Fragment>
  );
}

export default ProfileDetails;
