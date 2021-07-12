import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import { createLink } from "../api";

const CreateLink = () => {
  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const history = useHistory();

  return (
    <div className="CreateLink">
      <Form
        onSubmit={async (event) => {
          event.preventDefault();

          try {
            await createLink(link, comment);
            history.push("/links");
          } catch (error) {}
        }}
      >
        <FormGroup>
          <Label for="link">Link</Label>
          <Input
            type="text"
            id="link"
            placeholder="https://example.com"
            required={true}
            value={link}
            onChange={(event) => setLink(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="comment">Comment</Label>
          <Input
            type="textarea"
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default CreateLink;
