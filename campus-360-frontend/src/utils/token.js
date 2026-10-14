export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {

  const user = localStorage.getItem("user");

  if (!user || user === "undefined") {
    return null;
  }

  return JSON.parse(user);
};

export const removeUser = () => {
  localStorage.removeItem("user");
};