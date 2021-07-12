import React, { useState } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Links, Tags, NavBar, Home, CreateLink } from "./components";

const App = () => {
  const [links, setLinks] = useState([]);
  const [tags, setTags] = useState([]);

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path={"/links"}>
          <Links links={links} setLinks={setLinks} />
        </Route>
        <Route path={"/newlink"}>
          <CreateLink />
        </Route>
        <Route path={"/tags"}>
          <Tags tags={tags} setTags={setTags} />
        </Route>
        <Route path={"/"} exact>
          <Home />
        </Route>
        <Route>
          <h1>404 Page Not Found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
