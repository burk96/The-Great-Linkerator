import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import { createTag } from "../api";

const CreateTag = () => {
  const [tag, setTag] = useState("");
  const history = useHistory();

  return (
    <div className="CreateTag">
      <Form
        onSubmit={async (event) => {
          event.preventDefault();

          try {
            await createTag(tag);
            history.push("/tags");
          } catch (error) {}
        }}
      >
        <FormGroup>
          <Label for="tag">Tag</Label>
          <Input
            type="text"
            id="tag"
            placeholder="ex: Epic"
            required={true}
            value={tag}
            onChange={(event) => setTag(event.target.value)}
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default CreateTag;
