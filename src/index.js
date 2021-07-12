import React, { useState } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Links, Tags, NavBar, Home, CreateLink, CreateTag } from "./components";

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
        <Route path={"/newtag"}>
          <CreateTag />
        </Route>
        <Route path={"/"} exact>
          <Home />
        </Route>
        <Route>
          <h1>404 Page Not Found</h1>
          <img src="https://vignette.wikia.nocookie.net/spongebob/images/f/f7/Krab_Borg_003.png/revision/latest?cb=20200726123800" width="480px" alt="night of the robot 404" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
