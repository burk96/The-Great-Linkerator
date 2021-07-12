import React, { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Card, CardBody, CardTitle } from "reactstrap";

import { getTags } from "../api";

const Tags = (props) => {
  const { tags, setTags } = props;

  useEffect(() => {
    Promise.all([getTags()])
      .then(([tags]) => {
        setTags(tags);
      })
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Tags">
      <h1 className="display-3">Tags</h1>
      {tags.map((tag) => {
        return (
          <Card style={{ margin: "2rem" }} key={tag.name}>
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
