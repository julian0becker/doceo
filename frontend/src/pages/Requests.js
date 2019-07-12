import React from "react";
import RequestForm from "../components/RequestForm";
import IncomingRequests from "../components/IncomingRequests";

function Requests() {
  return (
    <div>
      <RequestForm />
      <IncomingRequests />
    </div>
  );
}

export default Requests;
