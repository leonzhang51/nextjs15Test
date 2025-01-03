"use server";
type user = { name: string; address: string };
const fetchAPI = async (url: string, method: string, data: user | null) => {
  try {
    const response = (
      await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method !== "GET" ? JSON.stringify(data) : null,
      })
    ).json();
    console.log("response", await response);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const submitActionWithCurrentState = async (
  prevState: { users: user[]; error: string | null },
  formData: FormData,
) => {
  const username = formData.get("username") as string;
  const address = formData.get("address") as string;

  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (prevState.users.some((user: user) => user.name === username)) {
    return { ...prevState, error: `User "${username}" already exists` };
  }

  return {
    users: [...prevState.users, { username, address }],
    error: null,
  };
};

// import all users info from mongodb via backend api server build with python fastApi
export const getAllUsers = async () => {
  const response = await fetchAPI("http://127.0.0.1:8000/", "GET", null);
  console.log("res", response);
  return response;
};

// add user info to mongodb via backend api server build with python fastApi
export const addUser = async (previousState: unknown, user: FormData) => {
  const response = await fetchAPI("http://127.0.0.1:8000/", "POST", {
    name: user.get("name") as string,
    address: user.get("address") as string,
  });
  if (response[0]) {
    return [{ success: true }, await getAllUsers()];
  }
  return [{ error: "Failed to add user" }];
};

// delete user info from mongodb via backend api server build with python fastApi

export const deleteUser = async (id: string) => {
  const response = await fetchAPI(
    `http://127.0.0.1:8000/${id}`,
    "DELETE",
    null,
  );
  console.log("response", response);
};
