// src/features/auth/authAPI.ts
import { axiosInstance } from "../../lib/axios";
import { LoginType, SignupType } from "../../types";

// User Signup
export const signupAPI = async (formData: SignupType) => {
  try {
    const response = await axiosInstance.post("/auth/signup", formData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating account!");
  }
};

// User Login
export const loginAPI = async (formData: LoginType) => {
  try {
    const response = await axiosInstance.post("/auth/login", formData);
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
