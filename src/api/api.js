import axios from "axios";

const API_KEY = process.env.API_KEY;
const baseURL = "https://api.unsplash.com/";

// const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${API_KEY}&query=${query}&page=${page}`;
export const getTrendingImages = async () => {
  try {
    const res = await fetch(`${baseURL}/photos?per_page=30`, {
      headers: {
        Authorization: `Client-ID ${API_KEY}`
      }
    });
    if (!res.ok) {
      console.error("failed", res.status);
      return;
    }
    const json = await res.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.error("error in making request", error);
  }
};

/** Return the searched images */
export const getSearchedImages = async (query, pageNo) => {
  const url = new URL(`${baseURL}/search/photos`);
  url.search = new URLSearchParams({
    per_page: 10,
    query: query,
    page: pageNo
  });
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${API_KEY}`
      }
    });
    if (!res.ok) {
      console.error("failed", res.status);
      return;
    }
    const json = await res.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.error("error in making request", error);
  }
};
