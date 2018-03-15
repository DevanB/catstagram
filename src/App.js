import React, { Fragment } from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { defaults, resolvers } from "./graphql/resolvers";
import "tachyons";

import ListPage from "./List";
import NewPage from "./New";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  clientState: {
    defaults,
    resolvers
  }
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
