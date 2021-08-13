import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import { createLinkTags, getTags } from '../api';

const AddLinkTag = ({
  showAddLinkTag,
  setShowAddLinkTag,
  selectedLink,
  setSelectedLink,
}) => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState();

  const handleClose = () => {
    setShowAddLinkTag(false);
    setSelectedLink({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const [[tagId]] = Object.entries(tags).filter((tag) => {
      return tag[1].name === selectedTag;
    });

    console.log('tagId', tagId);

    try {
      const res = await createLinkTags(selectedLink.id, tagId + 1);
      console.log(res);
    } catch (error) {
      console.error(error);
    }

    handleClose();
  };

  useEffect(() => {
    (async () => {
      const result = await getTags();
      setTags(result);
    })();
  }, []);

  return selectedLink.tags ? (
    <Modal isOpen={showAddLinkTag}>
      <ModalHeader>Add Tag to {selectedLink.url}</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="selectTags">Tags</Label>
            <Input
              type="select"
              name="select"
              id="selectTags"
              value={selectedTag}
              onChange={(event) => {
                setSelectedTag(event.target.value);
              }}
            >
              <option></option>
              {tags.map((tag) => {
                return !selectedLink.tags.includes(tag.name) ? (
                  <option key={tag.id}>{tag.name}</option>
                ) : (
                  ''
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Button
              type="submit"
              color="success"
              style={{ float: 'right', marginLeft: '1rem' }}
            >
              Add Tag
            </Button>
            <Button
              onClick={handleClose}
              color="secondary"
              style={{ float: 'right' }}
            >
              Close
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  ) : (
    ''
  );
};

export default AddLinkTag;
