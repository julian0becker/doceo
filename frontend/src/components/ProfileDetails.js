import React from "react";

import moment from "moment";

function ProfileDetails({ info }) {
  return (
    <div>
      <div>Username: {info.username}</div>
      <div>Email:{info.email}</div>
      <div>Joined:{moment(info.createdAt).fromNow()}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "400px"
        }}
      >
        Speaking:{" "}
        {info.languages.speaking.map(language => (
          <div key={language}>{language}</div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "400px"
        }}
      >
        Learning
        {info.languages.learning.map(language => (
          <div key={language}>{language}</div>
        ))}
      </div>
    </div>
  );
}

export default ProfileDetails;
