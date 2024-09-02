export async function fetchSingleGroup(groupId: string) {
  try {
    const token = localStorage.getItem("token");
    const url = `https://academics.newtonschool.co/api/v1/linkedin/channel/${groupId}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
  }
}
