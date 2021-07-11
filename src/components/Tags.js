import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Card, CardBody, CardTitle } from "reactstrap";

import { getTags } from "../api";

const Tags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    Promise.all([getTags()])
      .then(([tags]) => {
        setTags(tags);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="Tags">
      {tags.map((tag) => {
        return (
          <Card>
            <CardBody>
              <CardTitle>Name: {tag.name}</CardTitle>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default Tags;
