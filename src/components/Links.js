import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

import { getLinks } from "../api";

const Links = (props) => {
  const { links, setLinks } = props;
  const history = useHistory();

  useEffect(() => {
    Promise.all([getLinks()])
      .then(([links]) => {
        setLinks(links);
      })
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Links">
      <h1 className="display-3">Links</h1>
      <Button
        color="primary"
        onClick={() => {
          history.push("/newlink");
        }}
      >
        New Link
      </Button>

      {links.map((link) => {
        console.log(link);
        return (
          <Card style={{ margin: "2rem" }} key={link.id}>
            <CardBody>
              <CardTitle>
                URL: <a href={link.url}>{link.url}</a>
              </CardTitle>
              <CardSubtitle>Comment: {link.comment}</CardSubtitle>
              <hr />
              <CardText>Clicks: {link.clickcount}</CardText>
              <CardText>Date: {link.date}</CardText>
              <CardText>Tags: {link.tags}</CardText>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default Links;
