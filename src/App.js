import React, { Fragment } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "tachyons";

const client = new ApolloClient({ uri: "http://localhost:4000" });

const ListPage = () => <h1>List Page</h1>;
const NewPage = () => <h1>New Page</h1>;

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
