import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { getLinks, getTags, getLinksWithTags } from "../api";

const App = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    Promise.all([getLinks()])
      .then(([links]) => {
        setLinks(links);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>
        {links.map((link) => {
          return <div>{link.url}</div>;
        })}
      </h2>
    </div>
  );
};

export default App;
