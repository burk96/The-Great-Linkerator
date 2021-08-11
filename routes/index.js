const apiRouter = require('express').Router();
const {
  createLink,
  getLinks,
  getLinkById,
  destroyLink,
  createTag,
  getTags,
  createLinkTags,
  getLinksWithTags,
  updateLink,
} = require('../db/index.js');

//GET
apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/links', async (req, res, next) => {
  const result = await getLinks();

  res.send(result);
});

apiRouter.get('/tags', async (req, res, next) => {
  const result = await getTags();

  res.send(result);
});

apiRouter.get('/links/:linkId', async (req, res, next) => {
  const { linkId } = req.params;

  const result = await getLinksWithTags(linkId);

  res.send(result);
});

//POST
apiRouter.post('/links', async (req, res, next) => {
  const { url, clickCount = 0, comment } = req.body;

  const result = await createLink({ url, clickCount, comment });

  res.send(result);
});

apiRouter.post('/tags', async (req, res, next) => {
  const { name } = req.body;

  const result = await createTag({ name });

  res.send(result);
});

//PATCH
apiRouter.patch('/links/:id', async (req, res) => {
  const { id } = req.params;

  const { url, clickcount, comment } = req.body;

  const linkObj = { url, clickcount, comment };

  Object.keys(linkObj).forEach((key) => {
    if (linkObj[key] === undefined) {
      delete linkObj[key];
    }
  });

  const result = await updateLink(id, linkObj);

  res.send(result);
});

//DELETE
apiRouter.delete('/links/:id', async (req, res, next) => {
  const { id } = req.params;

  const result = await destroyLink(id);

  res.send(result);
});

module.exports = apiRouter;
