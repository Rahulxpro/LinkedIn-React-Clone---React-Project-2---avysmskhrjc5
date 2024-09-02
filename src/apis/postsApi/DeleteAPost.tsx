export async function deleteAPost(postId: string) {
  try {
    const token = localStorage.getItem("token");
    const url = `https://academics.newtonschool.co/api/v1/linkedin/post/${postId}`;

    const res = await fetch(url, {
      method: "DELETE",
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
