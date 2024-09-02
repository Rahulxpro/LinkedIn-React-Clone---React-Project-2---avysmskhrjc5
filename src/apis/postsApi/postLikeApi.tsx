export async function likePost(postId = "") {
  try {
    const url = `https://academics.newtonschool.co/api/v1/linkedin/like/${postId}`;
    const token = localStorage.getItem("token");

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        projectID: "i1dieevrt9g1",
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
