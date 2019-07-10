import React from "react";
import { Form, Button } from "semantic-ui-react";

export default function FriendsModal() {
  const handleOnSubmit = e => {
    e.preventDefault();
    console.log("clicked");
  };
  return (
    <div>
      <Form onSubmit={e => handleOnSubmit(e)}>
        <Form.Field>
          <h2>Find Friends</h2>
          <input placeholder="username..." />
        </Form.Field>
        <Button secondary>Submit</Button>
      </Form>
    </div>
  );
}
