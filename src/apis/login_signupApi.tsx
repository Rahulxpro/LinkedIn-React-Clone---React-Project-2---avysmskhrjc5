interface SignupBody {
  name?: string;
  email: string;
  password: string;
}

export async function fetchSignup(body: SignupBody) {
  try {
    const url = "https://academics.newtonschool.co/api/v1/user/signup";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        projectID: "avysmskhrjc5",
      },
      body: JSON.stringify({
        ...body,
        appType: "linkedin",
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

// LOGIN API

export async function fetchSignin(body: SignupBody) {
  try {
    const url = "https://academics.newtonschool.co/api/v1/user/login";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        projectID: "i1dieevrt9g1",
      },
      body: JSON.stringify({
        ...body,
        appType: "linkedin",
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
