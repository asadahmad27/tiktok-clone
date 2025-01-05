import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import axiosInstance from "../utils/AxiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // const login = async (credentials) => {
  //   try {
  //     const response = await axiosInstance.post("/token", credentials, {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //         Accept: "application/json",
  //       },
  //     });
  //     console.log(response);
  //     setUser(response.data.user);
  //     localStorage.setItem("access_token", response.data.token);
  //   } catch (err) {
  //     console.error(err.response?.data?.message || "Login failed.");
  //   }
  // };

  // const login = async (credentials) => {
  //   try {
  //     const formattedCredentials = new URLSearchParams();
  //     formattedCredentials.append("username", credentials.username);
  //     formattedCredentials.append("password", credentials.password);

  //     const response = await axiosInstance.post(
  //       "/token",
  //       formattedCredentials,
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //           Accept: "application/json",
  //         },
  //         maxRedirects: 0, // To detect redirection
  //       }
  //     );
  //     console.log(response);
  //     setUser(response.data.user);
  //     localStorage.setItem("access_token", response.data.token);
  //   } catch (err) {
  //     if (err.response && err.response.status === 302) {
  //       console.error("Redirect detected:", err.response.headers.location);
  //     } else {
  //       console.error(err.response?.data?.message || "Login failed.");
  //     }
  //   }
  // };

  const login = async (credentials) => {
    try {
      const data = new URLSearchParams();
      data.append("grant_type", "password");
      data.append("username", credentials?.username);
      data.append("password", credentials.password);

      const response = await axiosInstance.post("/token", data, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response?.status === 200) {
        console.log("Login Success", response.data.user);
        localStorage.setItem("access_token", response.data.access_token);
        setUser(response.data.user);
        return response;
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      return err;
    }
  };

  const meAPI = async () => {
    try {
      const response = await axiosInstance.get("/users/me");
      console.log(response, "Me");
      setUser(response?.data);
      return response;
    } catch (err) {
      console.error(err.response?.data?.message || "Me failed.");
      return err;
    }
  };
  console.log(user, "usus");
  const signup = async (credentials) => {
    try {
      const response = await axiosInstance.post(
        "/register/consumer",
        credentials,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response, "Respo");
      return response;
    } catch (err) {
      console.error(err.response?.data?.message || "SIgnup failed.");
      return err;
    }
  };
  const signupCreator = async (credentials) => {
    try {
      const response = await axiosInstance.post(
        "/register/creator",
        credentials,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response, "Respo");
      return response;
    } catch (err) {
      console.error(err.response?.data?.message || "SIgnup failed.");
      return err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, signup, signupCreator, meAPI }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
