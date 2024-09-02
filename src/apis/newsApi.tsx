export async function fetchNews() {
  try {
    const url =
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=77eb8dabc14a4d6cadf8fa3c79abf5c7";
    const res = await fetch(url, {
      method: "GET",
    });
    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error-->", error.message);
    } else {
      console.log("Error-->", error);
    }
  }
}
