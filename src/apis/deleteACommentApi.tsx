export async function deleteCommnetByID(postId: string) {
  try {
    const url = `https://academics.newtonschool.co/api/v1/linkedin/comment/${postId}`;

    const token = localStorage.getItem("token");

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        projectID: "avysmskhrjc5",
        "Content-Type": "application/json",
      },
    });

    if (res) {
      const jsonRes = await res.json();
      const data = JSON.parse(jsonRes);
      return data;
    } else {
      console.error("JSON string is empty");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error-->", error.message);
    } else {
      console.log("Error-->", error);
    }
  }
}
