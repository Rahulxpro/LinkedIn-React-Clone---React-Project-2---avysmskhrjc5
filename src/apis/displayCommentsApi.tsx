export async function fetchComments(postId: string) {
  try {
    const url = `https://academics.newtonschool.co/api/v1/linkedin/post/${postId}/comments`;

    const token = localStorage.getItem("token");

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        projectID: "avysmskhrjc5",
        "Content-Type": "application/json",
      },
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
