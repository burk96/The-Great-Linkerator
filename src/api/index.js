import axios from "axios";

export async function getLinks() {
  try {
    let { data } = await axios.get("/api/links");

    data.forEach(async (link) => {
      const [result] = await getLinksWithTags(link.id);
      const { tagname } = result || "None";
      link.tags = tagname ? tagname : "None";
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

export async function createLink(url, comment) {
  try {
    if (!url || !comment) {
      return false;
    }
    await axios.post("/api/links", { url, comment });

    return true;
  } catch (error) {
    throw error;
  }
}
