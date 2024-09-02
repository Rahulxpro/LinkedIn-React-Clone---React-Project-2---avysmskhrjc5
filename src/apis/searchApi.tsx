export async function searchContent(searchItems: {}) {
  try {
    const searchItemsJson = JSON.stringify(searchItems);
    const url = `https://academics.newtonschool.co/api/v1/linkedin/post?search=${searchItemsJson}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        projectID: "avysmskhrjc5",
      },
    });
    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error-->", error.message);
    } else {
      console.log("Error-->", error);
    }
    /*
          we check if error is an instance of Error. If it is, we safely access the message property. If it's not, we log the error object directly. This approach ensures that your code is type-safe and avoids the TypeScript error you encountered. 
      */
  }
}
