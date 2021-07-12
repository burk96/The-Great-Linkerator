import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Jumbotron } from "reactstrap";

const Home = () => {
  return (
    <div className="Home">
      <Jumbotron style={{ margin: "2rem" }}>
        <h1 className="display-3">Welcome to Linkerator</h1>
        <p className="lead">An app to track your links</p>
      </Jumbotron>
    </div>
  );
};

export default Home;
