import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";

const HttpLink = createHttpLink({
  uri: "http://localhost:5000"
});

// adds token automatically to protected routes
const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return { headers: { Authorization: token ? `Bearer ${token}` : "" } };
});

const client = new ApolloClient({
  link: authLink.concat(HttpLink),
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
