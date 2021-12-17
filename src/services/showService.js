export async function getShows() {
  try {
    var response = await fetch("http://localhost:1337/api/shows?populate=*");
    return response.json();
  } catch (e) {
    return false;
  }
}
