import React, { Fragment } from "react";
import { ApolloClient } from "apollo-client";
import { HttpLink, InMemoryCache, ApolloLink, split } from "apollo-boost";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "tachyons";

import ListPage from "./List";
import NewPage from "./New";

const httpLink = new HttpLink({ uri: "http://localhost:4000" });
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000",
  options: {
    reconnect: true
  }
});
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Fragment>
        <header>
          <Link to="/" className="ttu black no-underline">
            <h1>Catstagram</h1>
          </Link>
        </header>
        <Switch>
          <Route path="/" exact component={ListPage} />
          <Route path="/new" component={NewPage} />
        </Switch>
      </Fragment>
    </Router>
  </ApolloProvider>
);

export default App;
