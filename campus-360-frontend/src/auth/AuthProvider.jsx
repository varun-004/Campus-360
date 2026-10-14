import { useState } from "react";

import AuthContext from "./authContext";

import {
  getToken,
  getUser,
  removeToken,
  removeUser,
  setToken,
  setUser,
} from "../utils/token";

const AuthProvider = ({ children }) => {

  const [user, setCurrentUser] = useState(() => {
    const token = getToken();
    const savedUser = getUser();

    return token && savedUser ? savedUser : null;
  });

  const [loading] = useState(false);

  const login = (token, userData) => {

    setToken(token);

    setUser(userData);

    setCurrentUser(userData);

  };

  const logout = () => {

    removeToken();

    removeUser();

    setCurrentUser(null);

    window.location.href = "/login";

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;