// src/features/auth/authAPI.ts
import { axiosInstance } from "../../lib/axios";

// User Signup
export const signupAPI = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post("/auth/signup", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating account!");
  }
};

// User Login
export const loginAPI = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error while login process!");
  }
};

// User Logout
export const logoutAPI = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout", {});
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error logging out!");
  }
};
