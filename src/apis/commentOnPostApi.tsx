export async function createAComment(postId: string, content: string) {
  try {
    const url = `https://academics.newtonschool.co/api/v1/linkedin/comment/${postId}`;
    const token = localStorage.getItem("token");

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        projectID: "avysmskhrjc5",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
      }),
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
