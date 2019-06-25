import React from "react";
import { List } from "semantic-ui-react";
import moment from "moment";

function ProfileDetails({ info }) {
  return (
    <div>
      <List>
        <List.Item icon="user" content={info.username} />
        <List.Item icon="mail" content={info.email} />
        <List.Item icon="signup" content={moment(info.createdAt).fromNow()} />
        {info.languages.speaking.length > 0 && (
          <List.Item
            icon="comment outline"
            content={info.languages.speaking.map(language => (
              <span>{language}</span>
            ))}
          />
        )}
        {info.languages.learning.length > 0 && (
          <List.Item
            icon="pencil"
            content={info.languages.learning.map(language => (
              <span>{language}</span>
            ))}
          />
        )}
      </List>
    </div>
  );
}

export default ProfileDetails;
