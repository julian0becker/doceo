import React from "react";
import { Segment, Image } from "semantic-ui-react";

export default function LoadingBlock() {
  return (
    <Segment loading>
      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    </Segment>
  );
}
