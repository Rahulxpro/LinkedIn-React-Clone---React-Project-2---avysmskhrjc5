export async function createAGroup(formData: FormData) {
  try {
    const token = localStorage.getItem("token");
    const url = "https://academics.newtonschool.co/api/v1/linkedin/channel/";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        projectID: "avysmskhrjc5",
      },
      body: formData,
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
