require("dotenv").config();

export async function getShows() {
  const API_URL = process.env.REACT_APP_API_URL;

  try {
    var response = await fetch(API_URL + "shows?populate=*");
    return response.json();
  } catch (e) {
    return false;
  }
}
