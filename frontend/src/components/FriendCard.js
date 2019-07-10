import React from "react";
import { Segment, Image, List } from "semantic-ui-react";

export default function FriendCard({ friend }) {
  return (
    <Segment>
      <List>
        <List.Item>
          <Image
            circular
            size="tiny"
            src="https://react.semantic-ui.com/images/avatar/large/chris.jpg"
          />
          <List.Content>
            <List.Header>{friend.username}</List.Header>
            <List.Description>
              <div>
                Speaks:{" "}
                {friend.languages.speaking.map(language => (
                  <span key={language.value} style={{ marginRight: "5px" }}>
                    {language.label}
                  </span>
                ))}
              </div>
              <div>
                Learns:{" "}
                {friend.languages.learning.map(language => (
                  <span key={language.value} style={{ marginRight: "5px" }}>
                    {language.label}
                  </span>
                ))}
              </div>
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
    </Segment>
  );
}
