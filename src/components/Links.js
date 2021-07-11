import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";

import { getLinks } from "../api";

const Links = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    Promise.all([getLinks()])
      .then(([links]) => {
        setLinks(links);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="Links">
      {links.map((link) => {
        return (
          <Card>
            <CardBody>
              <CardTitle>
                URL: <a href={link.url}>{link.url}</a>
              </CardTitle>
              <CardSubtitle>Comment: {link.comment}</CardSubtitle>
            </CardBody>
            <CardBody>
              <CardText>Clicks: {link.clickCount}</CardText>
              <CardText>Date: {link.date}</CardText>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default Links;
