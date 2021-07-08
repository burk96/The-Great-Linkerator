// code to build and initialize DB goes here
const {
  client,
  createLink,
  createTag,
  // other db methods
} = require("./index");

async function buildTables() {
  try {
    await client.connect();

    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS link_tags;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS links;
    `);

    // build tables in correct order
    await client.query(`
      CREATE TABLE links(
        id SERIAL PRIMARY KEY,
        url VARCHAR(255) NOT NULL,
        clickCount INT NOT NULL,
        comment VARCHAR(255) NOT NULL,
        date DATE DEFAULT CURRENT_DATE
      )

      CREATE TABLE tags(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255)
      )

      CREATE TABLE link_tags(
        id SERIAL PRIMARY KEY,
        "linksId" INT REFERENCES links("id") NOT NULL,
        "tagsId" INT REFERENCES tags("id") NOT NULL
      )
    `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    const initialLinks = [
      {
        url: "https://www.youtube.com/",
        clickCount: 15,
        comment: "Oh man I love this site!",
      },
      {
        url: "https://www.twitter.com/",
        clickCount: 22,
        comment: "Oh buddy! This is a good one!",
      },
      {
        url: "https://www.ytmnd.com/",
        clickCount: 3,
        comment: "I don't believe it!",
      },
    ];

    await Promise.all(initialLinks.map(createLink));

    console.log("Links Created");
  } catch (error) {
    throw error;
  }
}

async function populateInitialTagData() {
  try {
    const initialTags = [
      { name: "Social" },
      { name: "Funny" },
      { name: "Epic" },
    ];

    await Promise.all(initialTags.map(createTag));
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .then(populateInitialTagData)
  .catch(console.error)
  .finally(() => client.end());
