// Connect to DB
const { Client } = require("pg");
const DB_NAME = "linkerator";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);

// database methods
async function createLink({ url, clickCount, comment }) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
      INSERT INTO links(url, clickCount, comment)
      VALUES($1, $2, $3)
      RETURNING *;
    `,
      [url, clickCount, comment]
    );

    return link;
  } catch (error) {
    throw error;
  }
}

async function createTag({ name }) {
  try {
    const {
      rows: [tag],
    } = await client.query(
      `
      INSERT INTO tags(name)
      VALUES($1)
      RETURNING name
    `,
      [name]
    );
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  createLink,
  createTag,
};
