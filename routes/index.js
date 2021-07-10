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

  res.send(result);
});

apiRouter.get("/alltags", async (req, res, next) => {
  const result = await getTags();

  res.send(result);
});

apiRouter.get("/link/:linkId", async (req, res, next) => {
  const { linkId } = req.params;

  const result = await getLinksWithTags(linkId);

  res.send(result);
});

//POST
apiRouter.post("/newlink", async (req, res, next) => {
  const { url, clickCount, comment } = req.body;

  const result = await createLink({ url, clickCount, comment });

  res.send(result);
});

apiRouter.post("/newtag", async (req, res, next) => {
  const { name } = req.body;

  const result = await createTag({ name });

  res.send(result);
});

//PATCH

//DELETE
apiRouter.delete("/link/:id", async (req, res, next) => {
  const { id } = req.params;

  const result = await destroyLink(id);

  res.send(result);
});

module.exports = apiRouter;
