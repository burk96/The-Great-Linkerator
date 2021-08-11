// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'linkerator';
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
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

async function getLinks() {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM links;
      `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getLinkById(id) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
        SELECT * FROM links
        WHERE id = $1;
      `,
      [id]
    );

    return link;
  } catch (error) {
    throw error;
  }
}

async function updateLink(id, fields = {}) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`
  );

  try {
    await client.query(
      `
        UPDATE links
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
      Object.values(fields)
    );
  } catch (error) {
    throw error;
  }
}

async function destroyLink(id) {
  try {
    await client.query(
      `
        DELETE FROM link_tags
        WHERE "linksId" = $1;
      `,
      [id]
    );

    const {
      rows: [link],
    } = await client.query(
      `
        DELETE FROM links
        WHERE id = $1;
      `,
      [id]
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
        RETURNING name;
      `,
      [name]
    );

    return tag;
  } catch (error) {
    throw error;
  }
}

async function getTags() {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM tags;
    `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createLinkTags({ linksId, tagsId }) {
  try {
    const {
      rows: [linkTag],
    } = await client.query(
      `
        INSERT INTO link_tags("linksId", "tagsId")
        VALUES($1, $2)
        RETURNING *;
      `,
      [linksId, tagsId]
    );

    return linkTag;
  } catch (error) {
    throw error;
  }
}

async function getLinksWithTags(linksId) {
  try {
    const { rows } = await client.query(
      `
        SELECT links.url, links.clickCount, links.comment, links.date, tags.name AS tagName
        FROM link_tags
        JOIN links ON link_tags."linksId" = links.id
        JOIN tags ON link_tags."tagsId" = tags.id
        WHERE links.id = $1;
      `,
      [linksId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  createLink,
  getLinks,
  getLinkById,
  updateLink,
  destroyLink,
  createTag,
  getTags,
  createLinkTags,
  getLinksWithTags,
};
