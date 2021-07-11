import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export async function getLinks() {
  try {
    const { data } = await axios.get(`${BASE_URL}/links`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTags() {
  try {
    const { data } = await axios.get(`${BASE_URL}/tags`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLinksWithTags(id) {
  try {
    const { data } = await axios.get(`${BASE_URL}/links/${id}`);

    return data;
  } catch (error) {
    throw error;
  }
}
