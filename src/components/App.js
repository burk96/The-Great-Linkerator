import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./NavBar.js";
import Links from "./Links.js";
import Tags from "./Tags.js";

const App = () => {
  return (
    <Router>
      <Switch>
        <div className="App">
          <NavBar />
          <Route exact path="/links">
            <Links />
          </Route>
          <Route exact path="/tags">
            <Tags />
          </Route>
        </div>
      </Switch>
    </Router>
  );
};

export default App;
