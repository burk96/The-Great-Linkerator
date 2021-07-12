import axios from "axios";

export async function getLinks() {
  try {
    let { data } = await axios.get("/api/links");

    data.forEach(async (link) => {
      const [url] = await getLinksWithTags(link.id);
      const { tagname } = url;
      link.tags = tagname;
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTags() {
  try {
    const { data } = await axios.get("/api/tags");

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
