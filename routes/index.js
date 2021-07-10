const apiRouter = require("express").Router();
const {
  createLink,
  getLinks,
  getLinkById,
  destroyLink,
  createTag,
  getTags,
  createLinkTags,
  getLinksWithTags,
} = require("../db/index.js");

//GET

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/alllinks", async (req, res, next) => {
  const result = await getLinks();

  res.send({
    allLinks: result,
  });
});

apiRouter.get("/alltags", async (req, res, next) => {
  const result = await getTags();

  res.send({
    allTags: result,
  });
});

apiRouter.get("/linkswithtags/:linkId", async (req, res, next) => {
  const { linkId } = req.params;

  const result = await getLinksWithTags(linkId);

  res.send({
    link: result,
  });
});

//POST

apiRouter.post("", async (req, res, next) => {
  const { url, clickCount, comment } = req.body;

  const result = await createLink({ url, clickCount, comment });

  res.send({
    newLink: result,
  });
});

//PATCH

//DELETE

module.exports = apiRouter;
