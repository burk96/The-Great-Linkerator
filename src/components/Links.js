import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

import AddLinkTag from './AddLinkTag.js';

import { getLinks, incrementClickCount } from '../api';

const Links = (props) => {
  const { links, setLinks } = props;
  const [refresh, setRefresh] = useState(false);
  const [showAddLinkTag, setShowAddLinkTag] = useState(false);
  const [selectedLink, setSelectedLink] = useState({});
  const history = useHistory();

  const handleShowAddLinkTag = () => {
    setShowAddLinkTag(true);
  };

  useEffect(() => {
    Promise.all([getLinks()])
      .then(([links]) => {
        setLinks(links);
      })
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <>
      <div className="Links">
        <h1 className="display-3">Links</h1>
        <Button
          color="primary"
          onClick={() => {
            history.push('/newlink');
          }}
          style={{ margin: '1rem' }}
        >
          New Link
        </Button>

        {links
          .sort((a, b) => {
            return b.clickcount - a.clickcount;
          })
          .map((link) => {
            return (
              <Card style={{ margin: '2rem' }} key={link.id}>
                <CardBody>
                  <CardTitle>
                    <h3>URL:</h3>
                    <Button
                      onClick={async () => {
                        await incrementClickCount(link.id, link.clickcount);
                        setRefresh(!refresh);
                      }}
                      href={link.url}
                      target="_blank"
                      color="warning"
                    >
                      {link.url}
                    </Button>
                  </CardTitle>
                  <CardSubtitle>Comment: {link.comment}</CardSubtitle>
                  <hr />
                  <CardText>Clicks: {link.clickcount}</CardText>
                  <CardText>Date: {link.date.split('T')[0]}</CardText>
                  <CardText>Tags: {link.tags}</CardText>
                  {link.tags === 'None' ? (
                    <Button
                      onClick={() => {
                        setSelectedLink(link);
                        handleShowAddLinkTag();
                      }}
                    >
                      Add Tag
                    </Button>
                  ) : (
                    ''
                  )}
                </CardBody>
              </Card>
            );
          })}
      </div>
      <AddLinkTag
        showAddLinkTag={showAddLinkTag}
        setShowAddLinkTag={setShowAddLinkTag}
        selectedLink={selectedLink}
        setSelectedLink={setSelectedLink}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default Links;
