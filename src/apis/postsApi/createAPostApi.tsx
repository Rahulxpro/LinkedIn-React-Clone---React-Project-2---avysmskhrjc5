export async function createAPost(formData: FormData) {
  try {
    const token = localStorage.getItem("token");
    const url = "https://academics.newtonschool.co/api/v1/linkedin/post/";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        projectID: "i1dieevrt9g1",
        appType: "linkedin",
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
