import axios from 'axios';

export async function getLinks() {
  try {
    const { data } = await axios.get('/api/links');

    await Promise.all(
      data.map(async (link) => {
        const [result] = await getLinksWithTags(link.id);
        const { tagname } = result || 'None';
        link.tags = tagname ? tagname : 'None';
      })
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTags() {
  try {
    const { data } = await axios.get('/api/tags');

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLinksWithTags(id) {
  try {
    const { data } = await axios.get(`/api/links/${id}`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createLink(url, comment) {
  try {
    if (!url || !comment) {
      return false;
    }

    await axios.post('/api/links', { url, comment });

    return true;
  } catch (error) {
    throw error;
  }
}

export async function incrementClickCount(id, clickcount) {
  clickcount++;

  try {
    const { data } = await axios.patch(`/api/links/${id}`, { clickcount });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createTag(name) {
  try {
    if (!name) {
      return false;
    }

    await axios.post('/api/tags', { name });

    return true;
  } catch (error) {
    throw error;
  }
}

export async function createLinkTags(linkId, tagId) {
  try {
    console.log(linkId, tagId);
    if (!linkId || !tagId) {
      return false;
    }

    await axios.post('/api/linktags', { linkId, tagId });

    return true;
  } catch (error) {
    throw error;
  }
}
